# Array Cardio 個人筆記紀錄用

######
這項目為熟悉Array的幾個基本用法，分別為
- filter()
- map()
- sort()
- reduce() 
這項目全都在瀏覽器的dev tools `(f12)` 中查看輸出結果


---
### Data
```javascript
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 }
];
const people = ['Beck, Glenn', 'Becker, Carl', 
'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry',
'Beethoven, Ludwig', 'Begin, Menachem',
'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert',
'Benenson, Peter', 'Ben-Gurion, David',
'Benjamin, Walter', 'Benn, Tony',
'Bennington, Chester', 'Benson, Leana',
'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric',
'Bergman, Ingmar', 'Berio, Luciano',
'Berle, Milton', 'Berlin, Irving',
'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi',
'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin',
'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph',
'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 
'Biondo, Frank', 'Birrell, Augustine', 'Black Elk', 
'Blair, Robert', 'Blair, Tony', 'Blake, William'];

```
- 一個 inventors array 
- 一個 people array
---
### 練習過程

1. Filter the list of inventors for those who were born in the 1500's
2. Give us an array of the inventor first and last names
3. Sort the inventors by birthdate, oldest to youngest
4. How many years did all the inventors live?
5. Sort the inventors by years lived
6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
7. sort Exercise：Sort the people alphabetically by last name
8. Reduce Exercise：Sum up the instances of each of these
---
## 一個蠻酷的功能
- 我們平時都 `console.log` 都是這樣

![](https://i.imgur.com/8bvkA3H.png)

- 這個項目教學裡面，作者用了這個 `console.table` 呈現的會是這樣一個表單輸出，超級帥的輸出，同時易讀性大大的增加

![](https://i.imgur.com/s5pl5EI.png)


### 第一題
##### 1. filter the list of inventors for those who were born in the 1500's
- 找出1500年代(16世紀)出生的發明家
- filter(): 方法於陣列中篩選出符合條件的元素，並返回一個新的陣列。
- 使用 arrow function 箭頭函式簡化
```javascript
const fifteen = inventors.filter(inventors => (條件式...)) 
```
- filter() 中接受一個回調函式做為參數，這個函式可以定義篩選條件。
```javascript
const fifteen = inventors.filter(inventors => 
    (inventors.year >= 1500 && inventors.year <= 1600))
    console.table(fifteen);
```
![](https://i.imgur.com/s5pl5EI.png)

### 第二題
##### Give us an array of the inventor first and last names
- 一個包含姓、名的陣列
- map() 對每個陣列內的元素做操作，並返回一個新的陣列，其中包含對每個元素的操作結果。
```javascript
const fullName = inventors.map(inventors => `${inventors.first} ${inventors.last}`);
console.log(fullName);
```
---
#### 額外小筆記 [ref](https://hackmd.io/Z9rZgNC6RhKm0zubfHDiPg?view#%E7%AC%AC%E4%BA%8C%E9%A1%8C)

- map 是從陣列內拿取東西做修改後，再放到新的陣列中，因此陣列長度不變。
- filter 則是過濾篩掉不符合的，因此陣列長度可能會改變。

### 第三題
##### Sort the inventors by birthdate, oldest to youngest
- 將發明家一年依年紀從大到小排列
- sort():排序
- `array.sort(compareFunction)` 為反覆調用比較的函式 直到返回的都為0為止
- return 正數、負數、0
- 正數調換位置、負數跟0 保持不變
- 透過交換 1 : -1 來做降序、升序的排列
```javascript
const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1)
console.table(ordered);
```
![](https://i.imgur.com/iWDBdwo.png)
---
過程解析[ref](https://hackmd.io/Z9rZgNC6RhKm0zubfHDiPg?view#%E7%AC%AC%E4%B8%89%E9%A1%8C)
* a 為第一個人，b 為第二個人，year 的數字越小，年齡越大
* return 1 會換位置，-1 不會換位置，0 相等不換位置
* 當 a.year 的數字 比 b.year 的數字大的時候，表示 a 比 b 小，回傳 1 就要換位置了
---

### 第四題
##### How many years did all the inventors live?
- 所有發明家歲數的總和
- 迴圈解法:
```javascript
var totalYears =0;
for(var i = 0; i < inventors.length; i++){
    totalYears += inventors[i].year
}
console.log(totalYears)
```
---
- reduce(): 累加
- `array.reduce(callback,initialvalue)
```javascript
const totalYears = inventors.reduce((total, inventor) =>{
    return total + (inventor.passed - inventor.year);
},0)
console.log(totalYears);
```
![](https://i.imgur.com/AK5sdLD.png)

- 以前都是用迴圈的方式宣告變數，從inventor第一個加總到最後
- reduce(callback,初始值),跟sort一樣，裡面一個arrow function,兩個參數第一個存數值，第二個放上item，並回傳 `return total + (inventor.passed - inventor.year);`，最後則為數值計算的初始值。
---

### 第五題
##### Sort the inventors by years lived
- 排序壽命長短,由長到短
- sort()
```javascript
const oldest = inventors.sort(function(a,b){
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;
    return lastGuy > nextGuy ? -1 : 1;
})
console.table(oldest);
```
![](https://i.imgur.com/LyCJeWR.png)

---
- 每個傳入的人，先計算壽命後，就進行對比 a壽命大於b壽命，回傳 -1表示不換位置，回傳1要換位置，由最長的壽命排列至最短的
---

### 第六題
##### create a list of Boulevards in Paris that contain 'de' anywhere in the name
[https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris)
- 找出包含de的名字
- 開啟dev tool，從網頁中用querySelector方式抓取DOM元素

![](https://i.imgur.com/6ZjctXf.png)
---
```javascript
const category = document.querySelector('.mw-category');
```
![](https://i.imgur.com/E5kDfuj.png)
---
```javascript
const links = category.querySelectorAll('a');
```
![](https://i.imgur.com/yBrXwzO.png)
---
```javascript
const de = links.map(link => link.textContent);
```
![](https://i.imgur.com/bLI1paW.png)
- querySelectorAll 方法回傳一個類似的陣列物件為 `NodeList` 。這類型的資料結構為 `類陣列` ，因為他們和陣列很相似，但無法使用陣列的方法去操作，例如:map和forEach。
---

```javascript
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links.map(link => link.textContent);
```
- 將 `querySelectorAll` 回傳來的 `NodeList` 再透過 `Array.from(...)` 轉化成真正的陣列。
- `map` 將 `<a>` 元素內的 `textContent` 返回形成一個新陣列

![](https://i.imgur.com/4u9qrIG.png)
---
```javascript
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
const de = links
.map(link => link.textContent)
.filter(streetName => streetName.includes('de'));
```
- 最後在 `map` 後面加上 `fillter` ，對 `map` 返回的新陣列進行篩選。
- 透過 `includes('de')` 檢查返回的 `textContent` 是否有包含字符 'de'，有則返回 `true` ，否則返回 `flase`
- 因此 `filter` 方法將保留包含 'de' 的值，並返回一個新陣列

![](https://i.imgur.com/qKpVXG1.png)
---

### 第七題
##### sort Exercise：Sort the people alphabetically by last name
- 按照姓氏來排序
- `split()` 依據給的內容去拆分 `string` 成 `array`
```javascript
const alpha = people.sort((lastOne, nextOne) => {
    console.log(lastOne +" ----  "+ nextOne)
});
```
![](https://i.imgur.com/cWnRdgs.png)
---
- split()將內容拆分 string 成 array
```javascript
const alpha = people.sort((lastOne, nextOne) => {
    const parts = lastOne.split(', ');
    console.log(parts)
});
```
![](https://i.imgur.com/YAI5pus.png)
---
- `Destructuring assignment` 語法,把陣列中的資料 `split` 方法返回陣列中的值賦值給變量 `[last, first]` ;
```javascript
const alpha = people.sort((lastOne,nextOne) => {
    const [Last, First] = lastOne.split(', ');
})
console.log(alpha);
```

![](https://i.imgur.com/PrGbNO8.png)

---
- a,b 比較，依照 `lastname` 的字母做順序排列
```javascript
const alpha = people.sort((lastOne,nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ');
    const [bLast, bFirst] = nextOne.split(', ');
    return  aLast > bLast ? 1 : -1;
})
console.log(alpha);
```
![](https://i.imgur.com/EtnBKhD.png)
---

### 第八題
##### Reduce Exercise：Sum up the instances of each of these
- 計算陣列內重複的個數
```javascript
const data = ['car', 'car', 'truck', 
        'truck', 'bike', 'walk', 'car', 'van', 
        'bike', 'walk', 'car', 'van', 'car', 
        'truck', 'pogostick'];
```
---
- 初始值位置放上空物件{},表示回傳的是一個物件
```javascript
const transportation = data.reduce(function(obj, item){
            if (!obj[item]) {
                obj[item] = 0;
            }
            obj[item]++;
            return obj
        },{})
        console.log(transportation);
```
![](https://i.imgur.com/tbc4TKA.png)

---
# 參考資料/資源
- [JavaScript30](https://javascript30.com/)
- [JS30 Day4](https://hackmd.io/Z9rZgNC6RhKm0zubfHDiPg?view)


