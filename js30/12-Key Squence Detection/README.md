# 12-Key Squence Detection 個人筆記紀錄用
### 這次課程是做一個暗號代碼

## 監聽
```javascript
const pressed = [];
window.addEventListener('keyup', (e) => {

})
```
---

## 設置暗號
```javascript
const pressed = [];
const secretCode = 'wesbuke';

window.addEventListener('keyup', (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
})
```
- splice() 內設置兩個參數，分別為起始點與要刪除的元素數量。
- 起始點的位置設置負數的話，在陣列中將會從陣列尾端開始算起，因此可以保留最新進去的內容。
- 第二個參數設置 `pressed` 最大的數量減到 `secretCode` 這樣一來就可以完整保留對應的長度，後續好做比對。
- [陣列索引負數](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

---

## 判斷暗號是否相同
```javascript
if (pressed.join('').includes(secretCode)){
    console.log('DING DING!');
    cornify_add();
}
```
- 將陣列內容分割好後，使用 join('') 將陣列中每個元素轉為字串，並連接在一起。
- `includes` js中一個檢查數組或字串是否有包含指定值，如果有就返回 `true` ，否則就 `false` 。

```javascript
const array = [1, 2, 3, 4, 5];

console.log(array.includes(2)); // true
console.log(array.includes(6)); // false

const str = 'Hello, world!';

console.log(str.includes('world')); // true
console.log(str.includes('foo'));   // false
```

