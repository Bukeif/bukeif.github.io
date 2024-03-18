# Custom HTML5 Video Player
### 這次課程是自訂義影片，熟悉video中的物件

---

## 影片播放/暫停 與 更新icon
```javascript
const video = player.querySelector('.viewer');

function togglePlay() {
    const method = video.paused? 'play' : 'pause';
    video[method]();
}
video.addEventListener('click', togglePlay);

```
- 抓取影片元素。
- 透過 `paused` 可以得到影片目前是否為暫停狀態: `true` or `false`。
- 使用簡化 `if-else` 判斷 `video.paused` 目前狀態，暫停為 `true` 將: `video[play]` 。

- [paly&pause](https://www.w3schools.com/tags/av_met_pause.asp)
- [paused](https://www.w3schools.com/tags/av_prop_paused.asp)

```javascript
const toggle = player.querySelector('.toggle');
function updateButton() {
    const icon = this.paused ? '▶' : '▮▮';
    toggle.textContent = icon;
}
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
```
- 與播放暫停一樣的作法，監聽 `video` 播放與暫停時執行 `updateButton` 。

---

### skip 進度條往前往後
```html
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```

- 在HTML內也要先設定好要倒退/快轉的參數。

```javascript
const skipButtons = player.querySelectorAll('[data-skip]');
function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click', 
skip));
```
- skip這邊是抓有設定 `data-skip` 的標籤。
- `dataset.skip` 抓取在html中的 `data-skip=` 內設定的值。
- currentTime 這個是 js 中提供影片目前播放時間的屬性，設定該屬性可以跳轉到指定位置。

[video.currentTime](https://www.w3schools.com/tags/av_prop_currenttime.asp)

---

### 音量與影片速度
```html
<input type="range" name="volume" class="player__slider" minn="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```
- 在html裡面將音量與速度用input表示，並設定 `name` 為 `volume` 與 `playbackRate` 這樣一來在js中可以直接做video屬性判定用。

```javascript
const ranges = player.querySelectorAll('.player__slider');
function handleRangeUpdate() {
    video[this.name] = this.value;
}
ranges.forEach(ranges => ranges.addEventListener('input' ,
handleRangeUpdate))
// ranges.forEach(ranges => ranges.addEventListener('change' ,
// handleRangeUpdate))
// ranges.forEach(ranges => ranges.addEventListener('mousemove' ,
// handleRangeUpdate))
```
- 對 `ranges` 用 `forEach` 方式，在底下的內容都加上監聽去執行 `handleRangeUpdate` 。
- `handleRangeUpdate` 內直接針對 `this` 的 `name` 與 `value` 直接做更改。

---

### 進度條
```javascript
const progressBar = player.querySelector('.progress__filled');
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', handleProgress);

```
-  對 `video` 上 `timeupdate` 的監聽
- `duration` 這個屬性將返回影片的總長度，目前時間點除與總長度得到的目前進度的小數點，再乘以100來換算百分比
- 由於這邊進度條的長度樣式是由 `flex-basis` 控制其填滿的長度，正好用 `style.flexBasis` 來控制其內容。
- [duration](https://www.w3schools.com/tags/av_prop_duration.asp)
```css
.progress__filled {
    width: 50%;
    background: #ffc600;
    flex: 0;
    flex-basis: 0%;
}
```

---

### 操作進度條
```javascript
const progress = player.querySelector('.progress');
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) *
     video.duration;
     video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```
- 操作進度條用了 click 與 點擊並拖曳
- 點擊並拖曳中 需要設定一個 `mousedown` 來判定是否是點擊下去後按住的狀態
- 用 `mousedown` 與 `mouseup` 來設定 `mousemove` 的時候只有點擊下去的時候會執行 `scrub`
- 監聽 `mousemove` 中 `mousedown && scrub(e)` 這是js中的邏輯判斷式 `&&`
將由左至由判斷前面 `mousedown` `true` 的話，才會繼續執行下一個動作，是一個蠻簡化版的 `if(true)` 的執行式
- `scrub` 中是抓取 點擊元素的 `offsetX` 去除以 `progress` 的寬度 `offsetWidth` 乘以影片總長，這段數學目前看不懂 😊
- [offsetWidth](https://www.w3schools.com/jsref/prop_element_offsetwidth.asp)
