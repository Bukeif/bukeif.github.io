# 22-Follow ALong Link Highlighter 個人筆記整理用

這次項目是做一個滑鼠移到特定焦點時會有 `hightligh` 的效果，是作者 `wesbos` 在 [https://stripe.com/](https://stripe.com/) 中看到導覽列的效果非常特別，而延伸的實作項目。

```Html
<nav>
    <ul class="menu">
        <li><a href="">Home</a></li>
        <li><a href="">Order Status</a></li>
        <li><a href="">Tweets</a></li>
        <li><a href="">Contact Us</a></li>
    </ul>
</nav>
            
<div class="wrapper">
    <p>Lorem ipsum dolor sit amet, <a href="">consectetur</a> adipisicing elit. Est <a href="">explicabo</a> unde natus necessitatibus esse obcaecati distinctio, aut itaque, qui vitae!</p>
    <p>Aspernatur sapiente quae sint <a href="">soluta</a> modi, atque praesentium laborum pariatur earum <a href="">quaerat</a> cupiditate consequuntur facilis ullam dignissimos, aperiam quam veniam.</p>
    <p>Cum ipsam quod, incidunt sit ex <a href="">tempore</a> placeat maxime <a href="">corrupti</a> possimus <a href="">veritatis</a> ipsum fugit recusandae est doloremque? Hic, <a href="">quibusdam</a>, nulla.</p>
    <p>Esse quibusdam, ad, ducimus cupiditate <a href="">nulla</a>, quae magni odit <a href="">totam</a> ut consequatur eveniet sunt quam provident sapiente dicta neque quod.</p>
    <p>Aliquam <a href="">dicta</a> sequi culpa fugiat <a href="">consequuntur</a> pariatur optio ad minima, maxime <a href="">odio</a>, distinctio magni impedit tempore enim repellendus <a href="">repudiandae</a> quas!</p>
</div>
```


# 文本處理

```javascript
const triggers = document.querySelectorAll('.sbody a');
const highlight = document.createElement('span');
highlight.classList.add('heighlight');
document.body.append(highlight);
```
- 抓取HTML元素
- 由於我的導覽列也有用到 a 因此用了 .sbody 去包覆內容物來指定。
- 創建一個 `span` 標籤，給予 `heighlight` class 並新增 body 內

---

# 獲取數值
```javascript
function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    console.log(linkCoords);
}
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
```
- 對 `triggers` 內的每個元素都加上 `mouseenter` 監聽
- 透過 `getBoundingClientRect()` 來獲取元素在視窗的位置和寬度高度

---

# 效果處理
```javascript
function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    console.log(linkCoords);
    const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
    };

    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink))
```
- 由於透過 `getBoundingClientRect()` 抓到的數值是基於 `用戶視窗` ，因此當網頁需捲動時 `highlight` 位置相會跑掉
- 透過額外設定 `coords` ，將 `window.scrollX/Y` 與 `linkCoords` 在裡面做相加來獲取，當前元素在網頁的絕對位置