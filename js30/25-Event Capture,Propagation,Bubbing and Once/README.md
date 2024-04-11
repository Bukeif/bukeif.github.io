# 25-Event Capture,Propagation,Bubbing and Once 個人筆記紀錄整理用

這次課程是學習 `事件捕獲` 、 `Bubbling` 、 `propagation` 、 `once`

# Bubbling
```javascript
function logText(e) {
    console.log(this.classList.value);
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
}
divs.forEach(div => div.addEventListener('click',logText));
```
- `JS addEventListener` 預設使用 `Bubbling` 冒泡事件
- 該事件執行方式將會由內而外執行掛有監聽事件的項目
- `e.stopPropagation();` 可以在第一個冒泡後就結束後續冒泡事件，因此只會出現當前元素資訊

![alt text](https://i.imgur.com/92AmJ2s.png)
- 如果外層有元素掛有其他 Event 也會同時觸發
```javascript
function twokl(e) {
    console.log(this,':twokl');
}
two.addEventListener('click',twokl)
```
![alt text](https://i.imgur.com/DGIsiUG.png)

---
# Capture
```javascript
function logText(e) {
    console.log(this.classList.value);
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
}
divs.forEach(div => div.addEventListener('click',logText, {
    capture: false, 
}));
```
![alt text](https://i.imgur.com/DcW0jQ6.png)

[事件捕捉&冒泡](https://hsien-w-wei.medium.com/dom-event-propagation-i-%E4%BA%8B%E4%BB%B6%E6%8D%95%E6%8D%89%E5%92%8C%E5%86%92%E6%B3%A1-event-capture-bubble-8214bf146b35)

- `capture` : `true` 由外而內捕捉(捕捉)， `false` 由內而外捕捉(冒泡事件)
- 作用在 `addEventListener` 第三個參數

![](https://miro.medium.com/v2/resize:fit:600/format:webp/1*DK2pGnkbAxCmV7uInbfcUw.png)

---

# once
```javascript
function logText(e) {
    console.log(this.classList.value);
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
}
divs.forEach(div => div.addEventListener('click',logText, {
    capture: false,
    once: true 
}));
button.addEventListener('click', () => {
    console.log('Click!!!');
}, {
    once: true
})
```
- once 該事件只會觸發一次
- true 該事件只觸發一次， false 持續監聽觸發


