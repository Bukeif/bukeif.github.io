# 27- Click and Drag 個人筆記記錄整理用

這次的項目是做可以拖曳目錄左右捲動的效果

# 過程
- 監聽滑鼠事件
- CSS特效
- 抓取位置
- 元素捲動

## 監聽事件
```html
<div class="items">
    <div class="item item1">1</div>
    <div class="item item2">2</div>
    
    ...

</div>
```
![alt text](https://i.imgur.com/uqzqzaf.png)
- 利用 

另外記錄下HTML在 `Visual Studio Code` 上的縮寫的便利性， $ 應該是一種計數值看要多少對 * 多少， {} 是定義標籤內的內容，同時也可以用 $ 來抓取當次的數字，非常好用。

---

```javascript
const slider = document.querySelector('.items');
let isDown = false;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
});
                
slider.addEventListener('mouseleave', () => {
    isDown = false;
});
                
slider.addEventListener('mouseup', () => {
    isDown = false;
});

slider.addEventListener('mousemove', (e) => {
    console.log(isDown);
});
```
- 抓取 `.items` 元素
- 因為是滑鼠拖曳的效果，所以會有以下事件監聽
- 滑鼠事件
    - `mousedown` : 按下滑鼠時觸發
    - `mouseleave` : 滑鼠移出指定的元素時觸發
    - `mouseup` : 滑鼠放開時觸發
    - `mousemove` : 滑鼠移動時觸發

---

## CSS 特效
```css
.items.active {
    background: rgba(255,255,255,0.3);
    cursor: grabbing;
    cursor: -webkit-grabbing;
    transform: scale(1);
}
```
```javascript
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
});
                
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});
                
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; //stop the fn from running
});
```
- CSS特效會在滑鼠按下時， `.items` 區塊會有活化的狀態
- 滑鼠是放開或裡開元素範圍的，將會移除 CSS 特效
- 在區塊內是按下拖曳，所以只有 `mousedown` 時 `isDown` 為 `true` ，放開跟離開區塊時都是 `false` ，這樣可以移動時只要抓取 `isDown` 的值來判定是否執行接下來的 `function`

---

## 抓取位置

```javascript
let startX;
let scrollLeft;
slider.addEventListener('mousedown', (e) => {
    ...
    // console.log(e.pageX);
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
                
...

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; //stop the fn from running
});
```
- pageX : 頁面上的水平位置
- offsetLEft : 元素在父元素上的水平偏移值
- startX : 頁面上的位置減去 `.slider` 的偏移值，將會得滑鼠在該元素上的位置以便後續計算移動距離用。
- scrollLeft : 紀錄 `.slider` 水平滾動區塊的左側位置。

---

## 元素捲動

```javascript
...

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; //stop the fn from running
    e.preventDefault();
    const  x = e.pageX - slider.offsetLeft;
    console.log({x, startX})
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
});
```
- preventDefault : 防止瀏覽器執行滑鼠的預設行為，在這邊是為了防止選取到文字或元素，因為這邊是自定義的滑塊，我們不希望在拖動的時候選取到任何東西
- 滑鼠按下，得到 `startX` 這是滑鼠的起始點，除非有放開重新按，要不然在移動中這個值不會變更
- 滑鼠移動，得到 `x` 目前位置，`x` 獲得的值與 `startX` 一樣，差異於 `x` 在移動時會重新定義
- 滑鼠向右滑時 `x - startX` ， X 比較大， `walk` 會得到正值
- 滑鼠向左滑時， `walk` 得到負值。
- 這次是要有個拉動的感覺，因此滑鼠向左時 `scroll` 值要增加的
- scrollLeft - 負值 = 正，區塊內容也會向左滑動
- scrollLeft - 正值 = 負，區塊內容向右滑動
- slider.scrollLeft : 通過調整這個值，可以控制滾動條的位置，從而達到拖曳捲動的效果








