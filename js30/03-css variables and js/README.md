# CSS Variables and JS
運用CSS變數與JS直接修改網頁屬性
---

### html

```html
<h2>Update CSS variables with <span class="h1">JS</span></h2>
<div class="controls">
    <label for="spacing">Spacing:</label>
    <input type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">
    <label for="blur">Blur:</label>
    <input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
    <label for="base">Base Color</label>
    <input type="color" name="base" value="#ffc600">
</div>
<img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">
```
- 設定每個input都有個 `name` 可供js抓取對應到css上
- 除了顏色以外的input 設定 `data-sizing` 來標記元素的大小單位
(padding與filter所用到都是px單位)
- `input type="color"` 顏色抓取上不需要用到單位因此不用 `data-sizing`  
---
### CSS
- css 變數宣告
```css
 /* 全域CSS變數宣告 */
:root{
    --base:#ffc600;
    --spacing: 10px;
    --blur: 10px;
}
/* 局部CSS變數宣告 */
.container {
            --background-color: lightblue;
            --text-color: darkblue;
}
```
- css變數應用
```css
/* 全域CSS變數使用 */
img {
    padding: var(--spacing);
    background: var(--base);
    filter: blur(var(--blur));
}
/* 局部CSS變數使用 */
.box {
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 20px;
    border: 2px solid var(--text-color);
}
```
- 全域變數使用上沒太大的問題，局部變數需要指定父系或自身標籤/id/class做宣告，這樣一來底下的元素都繼承，而全域則是:root代表根，因此底下文件都會全都順利繼承使用
---
### JS

```JavaScript
const inputs = document.querySelectorAll('.controls input');
function handleUpdate(){
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix)
}
inputs.forEach(input => input.addEventListener('input', handleUpdate));
```
- 對每個input 加上 input事件監聽 更動時抓取當下 `this` 的 `dataset.sizing` 、 name 、 value 的值 。
- 原作者是用mousemove、change 來做即時觸發，不過在input元素中，針對即時觸發input感覺比較合適。 參考 [ref](https://www.w3schools.com/jsref/event_oninput.asp)
- 更改 `document.documentElement` 的style等於更改CSS裡的:root