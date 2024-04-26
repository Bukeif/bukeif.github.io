# 29-CountDown Timer 個人筆記整理用

這次的課程是做一個倒數計時器，並可以自定義


# 過程
- 做出倒數的功能
- 顯示倒數的時間到畫面上
- 給按鈕上計時功能，並渲染畫面
- 自訂時間輸入+渲染畫面

## 做出倒數功能

倒數需要兩個元素，先抓出目前時間點，並將指定的時間長度+目前的時間點，再用 setInterval(...) 每秒更新

拆解步驟以下

### 取得目前時間

```javascript
function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
}
```
- now : 為目前時間透過 [Date.now()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Date/now) 取得一串的由1970/01/01 00:00:00 UTC 起經過的毫秒數
- then : 作為結束的時間點由 now 加上參數 `seconds` 這邊需要乘以 1000 因為 now 取得的時間為毫秒數。

---

### 設置 `setInterval(...)` 倒數
設置為每 1000 毫秒更新，用 then 減掉目前時間點 Date.now()，再判斷得出的結果是否小於等於 0 了，判斷達成就結束這次的計時。

```javascript
let countdown;
function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it !
        if( secondsLeft <= 0 ) {
            clearInterval(countdown)
            return;
        }
    }, 1000);
}
```
- 設置一個 `countdown` 變數，要用到 clearInterval ，需要 setInterval 存入變數，這樣一來這類功能就能透過變數來指定他
- secondsLeft : 透過 `then - Date.now` 算出還有多少時間差再除於 1000 換回秒數單位，這時會有會有些小數點，用 Math.round() 四捨五入取得整數的部分。
- if() : 判斷時間差是否小於等於 0 ，達成就清空 `countdown` 的計時功能，並 `return` 返回程式

---
## 顯示倒數的時間到畫面上

### 顯示倒數時間

時間倒數可以正常跑了後，就是做畫面處理了
再課程內給的 HTML 中可以看到已經有 `h1.display__time-left` 、 `p.display__end-time` 分別顯示倒數時間與結束的時間點

```javascript
const timerDisplay = document.querySelector('.display__time-left');

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    // console.log({minutes, remainderSeconds});
}
```
- .display__time-left 內是顯示幾分幾秒再倒數，因此要先處理好分、秒的值才能做顯示:
    - seconds : 參數接收為總秒數 seconds
    - minutes : seconds 除於 60 ，用 Math.floor 去掉小數點
    - remainderSeconds =  seconds 除於 60 的餘數，為目前剩餘的秒數
- display : 由於分或秒小於 10 時，顯示不會是 09:01 格式而是 9:1 ，要修正這問題需要在顯示時先加點判斷
    - 再 `${min/sec}` 前用 `${min/sec < 10 ? '0' : ''}`  JS 的條件表達式，來檢查分與秒是否小於10，來判斷是否要返回 '0' ，以表持時間的統一性與美觀性 
- document.title : 更換網頁的標題，將倒數的時間印在瀏覽器頁籤上做變化
- timerDisplay.textContent : 直接抽換 `.display__time-left` 的文字內容

---

```javascript
...

function timer(seconds) {
    ...
    displayTimeLeft(seconds);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        ...
        //display it 
        displayTimeLeft(secondsLeft);
    }, 1000);
}
```
- 將 `displayTimeLeft` 添加到 timer() 中執行
- 在進到 `setInterval` 之前先執行一次 `displayTimeLeft` 可以得到倒數的第一個數，並先做一個渲染
    - 如果不先執行一次的話，倒數 10 會漏掉一開始的 10 ，而顯示 9 作為開始，因為 setInterval 會過一秒後執行，因此才需要再進計時前做一次初始化的動作。
- 之後每次 `setInterval` 時都會再呼叫一次 `displayTimeLeft` 重新將時間渲染到畫面上做更新。

----

### 顯示結束時間

接著要顯示出結束時間，如 `Be Back At 10:23` ，因此需要再創一個 function displayEndTime 來做處理
```javascript
function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    displayEndTime(then);
   
   ...

}

...

function displayEndTime(timestamp) {
    //code
}
```
- 這邊代入一個時間點參數為 timer() 內的 `then` ，完成倒數的時間點
- 由於只是要顯示完成時間，所以不用像更新倒數時間一樣還要放到 setInterval 裡面，再一開始的時候執行一次就好。


```javascript

const endTime = document.querySelector('.display__end-time');

...

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjusetdHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjusetdHour}:${minutes < 10 ? '0' : ''}${minutes}`;

}
```
- end : new Date() 再 () 中指定那串長長的毫秒將會得我們所熟悉的時間格式，例如: Thu Apr 25 2024 14:35:41 GMT+0800 (台北標準時間) 
- 依照 `displaytimeLeft` 一樣對分秒做顯示，這邊要做處理的是 時跟分

- hour : 透過 getHours() 直接獲取結束的時間點小時
    - adjusetdHour : 如果要顯示PM & AM 那樣 12 小時制的話，利用 if 表達式來但判斷當前時間是否要減 12 做顯示
- minutes : 直接 getMinutes
    - 這邊獲得的分一樣會是 9 而不是 09 這樣的格式，可以提前做完判斷再丟進抽換的內容中，也可以在抽換的過程做判斷
- endTime.textContent : 抽換當前 `.display__end-time` 

---

### 按下按鈕顯示倒數

這功能都可以正常跑了後，終於來到按鈕執行預設時間的環節了!


```javascript

...

const buttons = document.querySelectorAll('[data-time]');
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer ));

```
- 先抓取 HTML 中有設有指定的 `dataset` `[data-time]` 元素
- 透 forEach 將 buttons 中每個按鈕都上 click 的監聽，並執行 startTimer
- startTimer() : 要做的事非常簡單就是，將按鈕中附帶的 `dataset.time` 這屬性提出來，由於 dataset 抓取出來的都是字串，所以要再用 `parseInt` ==把字串轉成整數==
- 將抓取到倒數時間，丟進 `timer()` 中作執行
- 到這邊為止都算完成按鈕的設定了，但是在經過重複點不同按鈕後，將會有好幾個 timer 在去觸發 setInterval 因此在 timer 這邊也要做些處理


- 在 timer 執行的開頭， 加入 clearInterval(countdown) 做一個預清除的動作，將已有的計時器都清除掉
```javascript
function timer(seconds) {
    // clean any existing timers
    clearInterval(countdown);
    ...
}

...
```

---
### input 輸入自訂義時間 + 畫面顯示

```javascript
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})
```
```HTML
<form  name="customForm" id="custom">
    <input type="text" name="minutes" placeholder="Enter Minutes">
</form>
```
- document.customForm : 透過 HTML 中的 name 抓到表單，並給他上 submit 的監聽
- e.preventDefault() : 由於 `form` 的特性在 `submit` 後，將會重整頁面，但這樣一來計時的效果將會沒有，所以要預防它這種預設行為，用 `e.preventDefault()` 可以停止該元素的預設行為。
- mins : 指定該表單中 name 為 minutes 的 input 抓取它的值
- timer(mins*60) : 依照 input 上的提示，使用者輸入將會是分鐘數，因此需要換算成秒數後，再由 `timer()` 執行
- this.reset() : 重置表單內填寫的內容為初始