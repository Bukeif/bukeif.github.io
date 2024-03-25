# 15-LoaclStorage 個人筆記紀錄用

#### 這次課程是做webStorage練習，表單資料暫存，蠻適合用在購物車會員登入介面上，做資料暫存

---

## webStorage

- localStorage : 可以跨瀏覽器分頁做使用，關掉瀏覽器資料也還會存在，待下次打開時還能用，且資料無期效限制，將永久保留直到被清除。

- sessinoStorage : 暫存期限有限，使用者關閉瀏覽器或分頁將會被清空。

```javascript
const items = JSON.parse(localStorage.getItem('items')) || [];

localStorage.setItem('items', JSON.stringify(items));
```
- `setItem('kye', 'value')`  `key` : 指定storage， `value` : 加入或修改原本的內容。
- `getItem('kye')` : 獲取對應的storage內容。
- `key()` : 輸入索引值，取得對應的storage名稱。
- `removeItem('key')` : 指定項目從storage中移除。
- `clear()` : 清楚所有數據，即清空儲存空間。

```javascript
function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text: 'Item Name',
        done: false
    }
}

addItems.addEventListener('submit', addItem);
```
- `this.querySelector('[name=item]')` 這邊 `this` 指 `add-items` 底下有 `[name=item]`

- this.reset() 可以重置表單內元件回到初始狀態 [reset](https://www.w3schools.com/jsref/met_form_reset.asp)

---

## 額外操作按鈕實做

在影片末段看到作者有提到可以做其他按鈕來練習，因此多做這兩個全選與全取消的，剛好也可以複習最近所學。

```html
<div class="method">
    <input data-all=true class="allcheck" type="submit" value="+  ALL CHECK">
    <input data-all=false class="alldele" type="submit" value="-  ALL CANCEL">
</div>  
```
- 在 `form` 標籤底下加上全選與全取消按鈕
- 設置 `dataset` 屬性
```javascript
const methods = document.querySelectorAll('.method');
function method(e){
    const el = e.target;
    const edata =  el.dataset.selectall === 'true'; //
    items.forEach(item => item.done = edata);
    // items.map((e) => {return e.done = edata})
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}
methods.forEach(allmet => allmet.addEventListener('click', method));
```
- 利用js == 特性讓字串與布林值做比較時轉換型態，後續拿到 `edata` 變數內容將會是轉換後的
- 原本是用 `map` 去做變更，但想 `map` 會回傳新陣列，後來改用 `forEach` 針對每個內容都跑過一次去變更，且不會返回新陣列
