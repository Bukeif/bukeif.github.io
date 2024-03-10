# Dev Tools Domination 個人筆記紀錄用

### 開發工具操作

## data
```javascript
const dogs = [
    {name: 'Snickers',age: 2},
    {name: 'hugo', age: 8}
];
```

---

## 工具筆記

```javascript
console.dir(p);
```
- `dir()` 顯示指定的對象屬性列表，如果傳遞一個DOM元素，將會顯示其屬性和方法。 

---

```javascript
dogs.forEach(dog => {
    console.group(`${dog.name}`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog old`);
    console.groupEnd(`${dog.name}`);
})
```
- `group()` 與 `groupEnd()` 把中間的日誌組合在一起，跟名字一樣群組式的操作。

---
```javascript
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve');

function greet(name) {
  console.count('greet() 被調用的次數');
  return 'Hello, ' + name;
}

greet('Alice');
greet('Bob');
greet('Alice');
```
```
Wes: 1
Wes: 2
Steve: 1
Steve: 2
Wes: 3
Wes: 4
Steve: 3
Steve: 4
Steve: 5
Steve: 6
greet() 被調用的次數: 1
greet() 被調用的次數: 2
greet() 被調用的次數: 3
```
- `count()` 計算語句被執行的次數

---

```javascript
timea = console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
.then(data => data.json())
.then(data => {
    // const end = performance.now();
    // const elapsedtime = end - start;
    // console.log('elapsed time:' ,elapsedtime)
    console.timeEnd('fetching data');
    console.log(data);
})
```
- `time()` 與 `timeEnd()` 搭配，測量兩者之前的執行的時間，並以毫秒單位顯示在控制台。
    - 兩者以()中的內容做匹配