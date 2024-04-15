# 26-Stripe Follow Along Nav 個人筆記紀錄整理用

這次的項目是跟課程 22 參考的網站 [script.com](https://stripe.com/) 滑鼠移入導覽列可以顯示對應內容

![alt text](https://i.imgur.com/nM2niXO.png)

# 過程
- 抓取元素，並監聽項目
- 呈現 CSS 效果


## 抓取元素
```css
.dropdownBackground {
    width: 100px;
    height: 100px;
    position: absolute;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 50px 100px rgba(50,50,93,.1), 0 15px 35px rgba(50,50,93,.15),0 5px 15px rgba(0,0,0,.1);
    transition: all 0.3s, opacity 0.1s, translate 0.2s;
    transform-origin: 50% 0;
    display: flex;
    justify-content: center;
    opacity: 0;
}

.arrow {
    position: absolute;
    width: 20px;
    height: 20px;
    display: block;
    background-color: white;
    transform: translateY(-50%) rotate(45deg);
}
```
```html
<div class="dropdownBackground">
    <span class="arrow">
    </span>
</div>
```
![alt text](https://i.imgur.com/ba4buNF.png)
- `.arrow` 與 `.dropdownBackground` 用 CSS 繪出類似訊息框的樣式，一個小細節還蠻值得注意的。

---

```javascript
const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav3 = document.querySelector('.top');

function handleEnter() {
    console.log('Enter!!!');
}
                
function handleLeave() {
    console.log('Leave!!!');
}

triggers.forEach(triggers => triggers.addEventListener('mouseenter', handleEnter));
triggers.forEach(triggers => triggers.addEventListener('mouseleave', handleLeave));
```
- 對 `triggers` 的元素加上 `mouseenter` 與 `mouseleave` 的監聽
- `.cool > li` 主要的三個選單的項目
- `.dropdownBackground` 追焦選單的白色背景
    - 包括 `.arrow` 子元素在內
- `.top` 整個導覽列元素



--- 

## 呈現 CSS 效果
### 顯示導覽列背景
```css
.trigger-enter .dropdown {
    display: block;
}
.trigger-enter-active .dropdown {
    opacity: 1;
}
.dropdownBackground.open {
    opacity: 1;
}
```
- 新增 `.trigger-enter` 與 `.trigger-enter-active` 底下的子元素有 `.dropdown` class 的 `dipslay: block` 與 `opacity: 1` 樣式
- 新增同時有 `.dropdownBackground` 與 `.open` 的元素就 `opacity:1`
- 會分開顯示的原因是因為兩個元素放一起的話會造成 opacity 的動畫不回呈現，先分開這兩個顯示的 CSS 樣式方便交由 JS 做前後處理。

---

```javascript
function handleEnter() {
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');
}
```
- 透過 setTimeout 是為了讓樣式先從 none 變成 block 後在給他上 opacity:1 ，讓這兩個 class 分別顯示做出動畫效果。
- 對當下元素加 `.tigger-enter` 先讓 ==display== 從 ==none > block== 
- 設 setTimeout 150ms 後 利用 && 在JS的特性 ==左邊條件成立再執行右邊條件== 用 contains 檢查該元素 class 內是否包含 `trigger-enter` ，有的話新增 `.trigger-enter-active`
- 用 && 的好處也用於 150 ms 後如果滑鼠不在那元素上也可以不用顯示該內容，這樣一個待處理的方式可以讓導覽列有不透明度動畫的同時，也可以解決晚掛動畫的延遲造成動畫殘影的問題。

```javascript
function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open')
}
```
- 滑鼠移出的時候，移除掉該元素的 `trigger-enter` & `trigger-enter-active`
- 移除導覽列背景的class `open`

---

### 定位導覽列背景位置

```javascript
function handleEnter() {
    
    ...

    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav3.getBoundingClientRect();

    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left
    }
    background.style.setProperty('width',`${coords.width}px`);
    background.style.setProperty('height',`${coords.height}px`);
    background.style.setProperty('transform',`translate(${coords.left}px, ${coords.top}px)`);
}
```
- 抓取當下元素底下有 `.dropdown` 的元素
- 透過 getBoundingClientRect() API 獲取抓取子元素的位置大小資訊 [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- 建立 coords 物件，內容為 .dropdown 元素高度、寬度、XY位置
- 由於 top 為整個畫面的開始，所以扣掉多出來的 nav 到視窗頂部的距離
- 透過 `setProperty` 新增 CSS屬性

# 個人疑問
- coords 中的 dropdownCoords.top 應該是直接抓到導覽列內容的位置了才對，怎麼還會需要在減，這中間的誤差值還是找不到，但依照教學看起來應該是扣掉 nav 的頂部所在位置。