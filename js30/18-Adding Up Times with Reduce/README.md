# 18-Adding Up Times with Reduce 個人筆記整理用

這次課程是做統計網頁上的影片總時長。

## 流程
- 抓取所有影片元素
    - 抓取標籤中的dataset值
- 換算時間
    - 透過抓到值換算成秒數加總
    - 將加總秒數 換成 時:分:秒

---
## 抓取元素
```javascript
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
```
- 抓取元素
- 需要注意 `querySelectorAll` 抓取的為 NodeList 屬於偽物件，要透過 `Array.from()` 或 `[...data]` 來轉換為陣列做使用

---

## 換算時間

```javascript
const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        return (mins * 60) +secs;
        console.log(mins, secs);
    })
    .reduce((total, vidSeconds) => total + vidSeconds);
```
- `data.*` 是從 `HTML` 標籤中自定義的 `data-xxx` 獲取資料。
- 透過第一次的 `map` 先將 `dataset.time` 的值抓出來。
- `dataset` 獲取的數值皆為字串類型。
- 在經過第二次 `map` 透過 `split` 分割字串，並將字串裡的數字轉成整數方便後續計算。
- 將抓出來的 `min` 乘上 60 獲取秒數。
- `reduce` 將分鐘換算出來的秒數加總。

---

```javascript
// 秒換算
// 一小時 = 60 分 * 60 秒 => 3600 秒
// 一分鐘 = 60 秒

// 以下總秒數開始透過 secondsLeft 換 時分秒 一一遞進

// 小時 = 總秒數 / 3600
// 分 = 總秒數 % 3600 / 60
// 秒 = 剩下的總秒數

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
                    
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
```
- / = 除法得到商數除不進時會有小數點 ， % 除法得到餘數
- 透過 `Math.floor` 把小數點去掉
- 主要在於總秒數出來後，把時間依序換算出來
