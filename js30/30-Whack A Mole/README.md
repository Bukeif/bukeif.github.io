# 30-Whack A Mole 個人筆記紀錄整理用

這是 JS30 課程的最後一天，要做一個打地鼠的遊戲
會有六個洞隨機出現地鼠，打到即得 1 分

# 過程
- 設定地鼠出現後持續在場的隨機時間
- 設定地鼠隨機出現的位置
- 結合上述，讓地鼠隨機出現
- 滑鼠點到地鼠時，分數 + 1


## 設定隨機時間

```javascript
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) +min);
}
```
- 接收兩個參數 最小值、最大值
- 隨機回傳兩個值中的數，透過 Math.round 四捨五入取整數值

---

## 地鼠隨機出現的洞

```javascript
const holes = document.querySelectorAll('.hole');
let lastHole;

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole) {
        console.log('Ah nah thats the same one bud');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
```
- 抓取 HTML 中所有 .hole 的元素
- idx : 獲取 holes 的內容數量 (6)，從中隨機抓取 0 ~ 5 數值，並透過 Math.floor 取其整數位
- hole : 透過 idx 獲得的數， holes[] 指定對應的元素
- lastHole : 由於不讓他數重複，每次執行該 funtion 時都先判斷該次 hole 是否等於上次的 hole，是的話再次執行一次 randomHole() ，否的話跳過，結束前記錄該次 hole

---

## 地鼠隨機冒出

```javascript
let timeUp = false;

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    console.log(time, hole);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time)
}
```
- 將前面兩個 function 合併
- time : 呼叫前面第一個 function randomTime()，設置好最短時間與最長時間
- hole : 呼叫 randomHole() ，決定要哪地鼠要從哪邊出來
    - 得到要出現的位置後，透過 classList.add 對選出來的 hole 新增 up 的 css 屬性
- 設置 setTimeout 依造 time 獲得的時間去延遲執行消除地鼠出現的時間
    - setTimeout 裡面加上判定 timeUp 判定遊戲是否停止了，還未停止則繼續執行 peep() 繼續跑地鼠出來

---

## 遊戲開始

```HTML
<button onClick="startGame()">Start!</button>
```
- 設置一個帶 onClick 的按鈕

```javascript
const scoreBoard = document.querySelector('.score');
let timeUp = false;
let score;

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}
```
- 抓取 .score 的元素
    - 由於遊戲開始，所以將內容透過 textContent 為 0
- timeUp : 設為 false ，讓遊戲開始
- score : 先將分數歸零
- 執行 peep();
- setTimeout : 設置 10秒後，將 timeUp 設為 true ，遊戲將停止

---

## 點擊地鼠事件

```javascript
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let score;

function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score ++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
```
- 抓取所有 .mole 為地鼠元素
- 透過老伙伴 forEach 為每個 moles 裡的元素上 click 監聽，並執行 bonk()
- e.isTrusted : 如果該事件是由使用者操作而產生，那麼會有一個 isTrusted 的項目其值為 true，這邊用來防作弊用途
    - 判定不是 true 的話，將 return 不再執行之後的判定
- 正常遊玩環節
    - score ++ : 分數 + 1
    - 移除該元素 up 的 CSS 屬性
    - HTML 中的記分板更新為目前的 score
    