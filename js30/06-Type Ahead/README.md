# Type Ahead  個人筆記紀錄用

### 工具
- fetch
    - then()
    - json()
- Array
    - filter()
    - push()
    - map()
    - join()
    - (...data)
- RegExp
    - match()
    - replace()

### 流程
1. 透過 `fetch` 抓取資料轉成 `JSON` ，展開運算子存至陣列中。
- 
```javascript
let  cities = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
```
2. 定義一個function`findMatches` ， 過濾資料
    - `filter()` 篩選符合的資料保留下來
    - `RegExp` 正規表達式，g代表全域，i代表不分大小寫
    - `match`  看起來是匹配器來著，進行匹配，如果沒有匹配，則返回null
- 回傳city state中有特定的關鍵詞
```javascript
function findMatches(wordToMatch, cities){
    return cities.filter(place => {
        //here we need to figure out if the city on state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
}
```
3.  一個function `displayMatches` ，負責把抓取出來的關鍵字顯示到html中。
- `map()`
- `RegExp()`
- `replace()` 替換place.city內符合regex匹配的內容。
- `join()` ('') 方法把所有HTML字串連在一起成為一個單一的HTML字串
- innerHTML 覆蓋指定內容，更新畫面
```javascript
function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray);
    const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="h1">${this.
        value}</span>`);
    const stateName = place.state.replace(regex, `<span class="h1">${this.
        value}</span>`);
        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
    
}
```
4.抓取input中的資料，並執行第一個函式，並把關鍵字送入做後續篩選輸出。
- 事件監聽
    - `change`  於input中有被輸入值，內容有更改並失去焦點後，就會觸發
    - `keyup` 每次按下並放開按鍵後就會觸發
    - `input` 標籤內的值發生改變時就會觸發，相較keyup來說，最值觀的差別就是當按鍵案住時input會持續抓取值的變化， `keyup` 會再放開的時候才抓取內容。

```javascript
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);
searchInput.addEventListener('input', displayMatches);

```

