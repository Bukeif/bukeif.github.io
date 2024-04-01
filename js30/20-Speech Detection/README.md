# 20-Speech Detection 個人筆記整理用

這次課程做的是對麥克風說話 網頁會呈現你說的單字非常的酷，使用的瀏覽器內建的功能，目前Chrome、Edge、Safari有支援
[支援查表](https://caniuse.com/?search=SpeechRecognition)
# 過程:
- 獲取麥克風權限與網頁元素
- 接收 result 並做處理
- 單行顯示 & 連續換行顯示

# 獲取權限

```javascript
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
```
- 將 `SpeechRecognition` 設為全域變數
- 瀏覽器有前綴屬性，需要這行來支援前綴與無前綴版本
[詳細](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API#javascript)

```javascript
const recognition = new SpeechRecognition();
recognition.interimResults = true;
```
- 建立一個 `SpeechRecognition` 物件
- interimResults : 控制是否回應，預設為 false [詳細](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults)

```javascript
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
```
- 抓取 .words 標籤
- 創建一個標籤 `p` 生成再 `.words` 底下做子元素

# 接收 & 處理

## 接收資料
```javascript
recognition.addEventListener('result', e => {
    console.log(e);
})
recognition.start();
```
![alt text](https://i.imgur.com/jyWprZG.png)

- 開始麥克風接收，並監聽 result 時回傳該資訊
- 會看到接收到的內容文字會存在 `results[0].transcript` 下

---


## 對獲取的資料做進一步處理
```javascript
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    
    p.textContent = transcript;
    console.log(transcript);
})
recognition.addEventListener('end', recognition.start);
recognition.start();
```
- 將結果轉成陣列，透過 `map` 把 `results[0].transcript` 內的文字資料取出來，並用 `join('')` 取消它們陣列的型態，組成一個字串
- 透過 `textContent` 將 `p` 的文本替換成解析後文字
- 對 `recognition` 監聽結束時再次執行 `start()`

---

## 呈現類型
- 目前就完成了一種文字的呈現，我們說的話會像字幕一樣顯示，講下一句的時候會是新的做取代目前內容，因為我們只有一個 p 那他的 textContent 就是直接取代目前的內容。

- 另外一種就會像講稿一樣一行一行的呈現


```javascript
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    
    p.textContent = transcript;
    if(e.results[0].isFinal) {
        p = document.createElement('p');
        words.append(p);
    }
    console.log(transcript);
})
recognition.start();
```
- 在原先 p.textContent 底下新增 if 去判斷該內容是否停止輸入階段
- 在完成那次執行新增一個標籤 `p`  `append` 再 `words` 底下

---

## 額外應用
```javascript
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    
    p.textContent = transcript;
    if(e.results[0].isFinal) {
        p = document.createElement('p');
        words.append(p);
    }
    if(transcript.includes('get the weather')) {
        console.log('Geting the weather')
    }
    console.log(transcript);
})
recognition.start();
```
- 設定關鍵字，當提到該關鍵字時會觸發對應的 function

