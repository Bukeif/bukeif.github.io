# 23-Speech Synthesis 個人筆記整理用

這次的課程是做文字轉語音 `SpeechSynthesis` ，與20周的項目 `SpeechRecognition` 是都是由 `Web Speech API` 所提供的

[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

# 過程
- 抓取HTML元素
- 設定功能

# 抓取HTML元素

```javascript
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;
```
- 

---

# 設定功能
## 語音種類清單
```javascript
function populateVoices() {
    voices = this.getVoices();
    // console.log(voices);
    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}"> ${voice.name} (${voice.lang})</option>`)
        .join('');
}
speechSynthesis.addEventListener('voiceschanged', populateVoices);
```
- 透過 `speechSynthesis` 監聽 `voiceschanged` 事件
- 使用 getVoices() 來獲取語言清單

[SpeechSynthesis: voiceschanged event](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event)

- 透過 `filter` 過濾 `voices.lang` 中包含 `includes()` 'en' 的語系
- 再由 `map` 對篩選後的內容編輯成下拉是選單的HTML，並用 `join('')` 來做成字串 `innerHTML` 對應的位置

---

### setVoice
```javascript

function setVoice(){
    msg.voice = voices.find(voice => voice.name == this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

voicesDropdown.addEventListener('change',setVoice);
```
- 監聽 `voicesDropdown` 的 `change` 事件
- 透過 `find` 找到目前選取的項目是跟 `voice.name` 相同的留下，並讓 `msg.voice =` 該語系

---

### toggle
```javascript
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
```
- `speechSynthesis.cancel()` 取消當前說話行動
- 預設 `startOver` 為 `true`
- 檢查如果 `startOver` 為 `true` 時， `speechSynthesis.speak(msg)` 重新讀取 `msg` 內容說話 
- 對 `speakButton` & `stopButton` 設置 `click` 監聽

---

## 設定 rate && picth
```javascript
const options = document.querySelectorAll('[type="range"], [name="text"]');

function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
}

options.forEach(option => option.addEventListener('change', setOption));
```
- 對 `options` 內的元素設置 `change` 的監聽
- 再次感嘆這種數值變更的抓取方式
- [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch) 語速跟音調設置變化直接 `.pitch =1.5` 或 `.rate = 1.5`
- 因此可以直接抓取 `name` 與 `value` 就可以執行

