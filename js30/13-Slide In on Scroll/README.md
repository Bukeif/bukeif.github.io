# 13-Slide In on Scroll 個人筆記紀錄用
#### 這次課程是做一個捲動互動的網頁，利用監聽Scroll的位置來做圖片的顯示，這個功能一開始在apple官網看到過真的很吸引人的互動功能，但一直沒實做過，透過這次可以來實作一次並知道原理真的蠻有趣的。
---
## HTML

- 假圖網站: [http://unsplash.it/400/400](http://unsplash.it/400/400)
- 與許多 `div` 包了許多假文 `p` 跟假圖 `img`
```html
<img src="http://unsplash.it/400/400" class="align-right slide-in">
```

---

## CSS

- 使用 `opacity` 先做 圖片隱藏
- 在使用 `transform` 做圖片的位移，並用 `transition` 給每個屬性變化時都加上動畫過度
```css
.slide-in {
    opacity: 0;
    transition: all .5s;
}
```
- 設置 `.active` 的 `class` 後續控制圖片用
```css
.slide-in.active {
    opacity: 1;
    transform: translateX(0%) scale(1);
}
```

---

## JavaScript

```javascript
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && ! timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}
```
- function debouce: 為短時間大量觸發的事件處理，製造間隔時間。例如:事件函數每 250 ms 執行一次。
[補充](https://www.mropengate.com/2017/12/dom-debounce-throttle.html)
- [參考](https://hackmd.io/t5LFL4FYTCOzYK4CdMzCqw?view)
---

```javascript
function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        // half way through the image
        const slideInAt = (window.scrollY + window.innerHeight) -
        sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShow = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShow && isNotScrolledPast) {
            sliderImage.classList.add('active');
        }else{
            sliderImage.classList.remove('active');
            
        }
    })
}
```
- checkSlide 判斷 scroll 是否進圖片範圍

- `window.scrollY + window.innerHeight` 這算式要求出以 ==目前視窗的高度加上捲動軸Y的位置== 可得到 ==目前視窗底部位於 "整個網頁的位置" 的哪裡== 
- `sliderImage.height / 2` 算出圖片一半高的數，透過目前視窗底部位於到網頁的位置哪裡，去減掉圖片一半高代表要過圖一半才會顯示
- `isHalfShow` 做 `slideInAt` 大於圖片頂部所在的位置的比對，代表視窗底部減掉該圖片的高度一半後還大於圖片的話，是超該圖片的一半了，將會返回true
- `isNotScrolledPast` 單純判定目前滾輪位置是否在圖片底部之上
- 如果目前 視窗底部 處在圖片過了一半並且還在圖片底部上方將會秀出圖片

- 這數學相關的邏輯對我來說真的還是太難了理解了段時間...



