# Array Cardio Day 2 個人筆記紀錄用
### Data
```javascript
const people = [
    {name: 'Wes', year: 1988 },
    {name: 'Kait', year: 1986 },
    {name: 'Irv', year: 1970 },
    {name: 'Lux', year: 2015 },
]
const comments =[
    {text: 'Love this!', id:523423 },
    {text: 'Super good', id:823423 },
    {text: 'You are the best', id:2039842 },
    {text: 'Ramen in my fav food ever', id:123523 },
    {text: 'Nice Nice Nice!', id:542328 },
];
```
### 工具
- Array
    - `some()`
    - `every()`
    - `find()`
    - `findIndex()`
    - `splice()` 直接修改原先陣列
    - `slice()` 創建一個新副本，而不修改原先陣列

---
### some()

array中有一個符合條件就回傳 true

### every()

array中每個都要符合才會回傳 true

### find()

Array中找到第一個符合的元素

![alt text](https://i.imgur.com/XdqmBtK.png)

### findIndex()

Array中找到第一個內容符合的指標

![alt text](https://i.imgur.com/oBCYiR7.png)

### splice() && slice()
這兩個一開始真的搞在一起
不過後面比較起來，
- `splice` 是直接修改原先陣列的，

- `slice` 簡單淺拷貝Array的方法 [ref](https://ithelp.ithome.com.tw/articles/10224915)
    - slice() 方法創建原始陣列的一個新副本，而不會修改原始陣列。
    - 它接受兩個參數：起始索引和結束索引（不包括結束索引處的元素）。
    - 如果只提供一個參數，則從該索引開始到陣列末尾的所有元素都將包括在內。
```javascript
const index = comments.findIndex(comment => comment.id ===
823423);
console.log(index);
comments.splice(index, 1);
```
![alt text](https://i.imgur.com/utSRZOH.png)

slice的時候先指定第0個到第1不包括1，然後index+1=2，從2開始到最後一個，因此我output時才不會有1的資料

```javascript
const index = comments.findIndex(comment => comment.id ===
823423);
console.log(index);
// comments.splice(index, 1);
const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1 )
];
```
![slice()](https://i.imgur.com/Qhxw3eU.png)