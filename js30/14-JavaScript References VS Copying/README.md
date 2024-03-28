# 14-JavaScript References VS Copying 個人筆記紀錄用


## 淺拷貝(一維陣列適用)
```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team2 = players.slice();

```
team 的內容參考 players，因此修改 team內容時， players也會做更改

slice() [slice()](https://ithelp.ithome.com.tw/articles/10224915)

---
```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team3 = [].concat(players);

```
concat() 用來合併兩個或多個陣列或元素。concat()不會改變原有的陣列，回傳一個包含呼叫陣列本身的值，作為代替的是回傳一個新陣列。[concat()](https://ithelp.ithome.com.tw/articles/10224585)

---
```javascript
const team4 = [...players]

```
- ES6 spread，展開運算式

---
```javascript
const team5 = Array.from(players);
```
Array.from() 將 ArrayLike 或 Iterable 轉為Array [Array.from()](https://medium.com/%E5%B0%8F%E9%83%AD-%E0%B9%80%E0%B8%88%E0%B8%99/%E8%8F%9C%E9%B3%A5%E5%B7%A5%E7%A8%8B%E5%B8%AB-array-from-%E6%96%B9%E6%B3%95%E4%BB%8B%E7%B4%B9-c00568852a44)

---

## 深拷貝(適用多維陣列)
```javascript
const cap2 = Object.assign({}, person, {number: 99,age: 12 });
console.log(cap2);
```
- 物件深拷貝

[Object.assign](https://ithelp.ithome.com.tw/articles/10200860?sc=iThelpR)

---
```javascript
const dev2 = JSON.parse(JSON.stringify(wes));

```
- JSON.stringify(wes)會將物件轉為字串。
- JSON.parse() 將字串轉成一個新的陣列回傳，因此完全複製wes多維物件的內容。