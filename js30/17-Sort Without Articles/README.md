# 17-Sort Without Articles 個人筆記整理用

這次的課程比較偏向複習以前學的Array的操作，並用在一些文章編排上呈現。

## 工具

- [array.srot()](https://www.w3schools.com/js/js_array_sort.asp)
- [array.map()](https://www.w3schools.com/jsref/jsref_map.asp)
- [array.join()](https://www.w3schools.com/jsref/jsref_join.asp)

- [string.replace()](https://www.w3schools.com/jsref/jsref_replace.asp) 替代 
- string.trim()


## 排列順序

- sort() : 按照字母順序在陣列中做排序
---

### 複習sort()做法

```javascript
let arr = [4, 2, 5, 1, 3];
arr.sort();
console.log(arr); // [1, 2, 3, 4, 5]
```
- 依數字大小做排序

```javascript
let arr = [1, 2, 3, 4, 5];
arr.sort((a, b) => b - a); // 將陣列反轉
console.log(arr); // [5, 4, 3, 2, 1]
```
- 依大小作反轉

---

- `array.sort(compareFunction)` 為反覆調用比較的函式 直到返回的都為0為止
- return 正數、負數、0
- 正數調換位置、負數跟0 保持不變
- 透過交換 1 : -1 來做降序、升序的排列

---

```javascript
const sortedBands = bands.sort(function (a, b){
    if ( strip(a) > strip(b) ){
        return 1;
    } else {
        return -1;
    }
})
```
- 👆一般寫法
- 👇簡化寫法

```javascript
const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
```

## 複習map()做法

- map 是照順序從陣列內拿取東西做修改後，再放到新的陣列中。
- 陣列長度不變。

[ref](https://www.w3schools.com/jsref/jsref_map.asp)

---
```javascript
const newArray = array.map(callback(currentValue, index, array));
```
- `array` : 是要遍歷的陣列
- `callback` :  用來定義陣列中每個元素的操作function，可以接受三個參數。
    - `currentValue` : 當前處理的元素 。
    - `index` : 當前處理的元素的索引 。
    - `array` : 原始陣列 。
- `newArray` : 返回的新陣列，包含了 `callback` 的返回值。

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(num => num * 2);

console.log(doubledNumbers); // [2, 4, 6, 8, 10]
```

## join() 用法

- 對陣列用法
- 將陣列所有元素連成一個字串
- 可以指定內容將每個元素隔開
- 回傳為字串

```javascript
array.join(separator);
```
- `array` : 要連接成字串的陣列。
- `separator` : 可選參數，內容可用來取代分格元素的逗號，如果省略不寫，則為逗號。

---

```javascript
const fruits = ['apple', 'banana', 'orange'];

const result = fruits.join(' ');

console.log(result); // "apple banana orange"
```

## replace() 用法

- 對字串的方法
- 對指定的字串或正則表達式匹配替換為新字串。
- 返回新字串，不會修改原始字串。

---

```javascript
string.replace(searchValue, newValue);
```

- `string` : 要進行替代的原始字串。
- `searchValue` : 要被替代的字段或是正則表達式。
- `newValue` : 要替換 `searchValue` 的新字串。

```javascript
const sentence = 'I love JavaScript! JavaScript is awesome!';
const newSentence = sentence.replace('JavaScript', 'Python');
console.log(newSentence); // "I love Python! Python is awesome!"
```
---

## trim() 用法

- 用於字串
- 刪除字串兩端的空白字符
- 返回新字串，不回修改原始字串。

---

```javascript
string.trim();
```
- `string` : 要進行修改的原始字串。

```javascript
const str = '   Hello, World!   ';
const trimmedStr = str.trim();

console.log(trimmedStr); // "Hello, World!"
```


---

##

```javascript
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '')
    .trim();
}

const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

document.querySelector('#bands').innerHTML =
    sortedBands
    .map(band => `<li>${band}</li>`)
    .join('');
```
