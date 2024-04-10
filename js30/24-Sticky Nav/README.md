# 24-Sticky Nav 個人筆記紀錄整理用

這項目是製作當網頁下滑超過導覽列時，將導覽列置頂固定在最上方

# 過程
- 監聽滾輪抓取導覽列的頂部所在位置 offsetTop
- 判斷數值，增加 fixed 效果
- 優化

## 監聽抓取數值
```javascript
const nav2 = document.querySelector('#main');
const topOfNav = nav2.offsetTop;
function fixNav(){
    console.log(topOfNav, window.scrollY);

}
window.addEventListener('scroll',fixNav);
window.addEventListener('resize', () => {
    topOfNav = nav2.offsetTop;
})
```
- 設置 scroll 與 reize ，滾動網頁時呼叫 function 做處理，並在視窗大小變更時，重新抓取nav 頂部的位置

---

## 比對數值，新增 fixed 效果
```javascript
function fixNav(){
    if (window.scrollY >= topOfNav) {
        document.body.classList.add('fixed-nav');
    } else {
        document.body.classList.remove('fixed-nav');
    }

}
```
```css
.fixed-nav .site-wrap {
    transform: scale(1);
}
.fixed-nav .nav2 {
    position: fixed;
    box-shadow: 0 5px rgba(0,0,0,0.1);
}
.fixed-nav .nav2  li.logo {
    max-width: 500px;
}
```
- 判斷 `scrollY` 大於等於導覽列頂部位置時，新增 `fixed-nav ` class 到body上
- logo 的顯示也一樣，只要設置好 js 的 class 添加，剩下的功能將都可以交由 CSS 這邊編輯
- 這邊個人自認蠻酷的直接對 body 新增 class 指定底下的css直接有動作，終究是寫太少被這樣的方法啟發到。


---

## 優化

由於 fixed 是直接把導覽列從 body 中抽離出來，固定在最上面，所以原本的位置將會空出來由下面的元素替補上，就造成了 `jerky jump`  網頁內容突然往上跳的突兀畫面。

```javascript
function fixNav(){
    console.log(topOfNav, window.scrollY);
    if (window.scrollY  >= topOfNav) {
        document.body.style.paddingTop = nav2.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
    } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
    }

}
```
- 在新增 fixed 效果時，將 body 的 paddingtop 設置為導覽列的高度，移除時也將 paddingtop 歸零



