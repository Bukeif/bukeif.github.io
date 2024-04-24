# 28-Video Speed Controller

這次的課程是做一個，客製化的影片速度控制條。

# 過程
- 抓取元素監聽
- 讀條跟隨滑鼠移動
- 控制影片速度

## 抓取元素監聽
```html
<div class="wrapper">
    <video class="flex" width="765" height="430"  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" loop controls></video>
    <div class="speed">
        <div class="speed-bar">1x</div>
    </div>
</div>
```
```javascript
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

speed.addEventListener('mousemove', function(e) {
    console.log(e);
})
```
- `.speed` ， 獲取滑鼠在上面的移動資訊
- `.speed-bar` ， 那條顏色絢麗的背景
- 抓取 `.flex` ， 影片控制用
- console.log(e) 確認滑鼠移動有成功運作

---
## 讀條跟隨滑鼠移動
```javascript
...

speed.addEventListener('mousemove', function(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const height = Math.round(percent * 100) + '%';
    bar.style.height = height;
    
    console.log(percent);
})
```
- y :
    - e.pageY : 滑鼠在頁面中的垂直位置
    - offsetTop : 該元素頂部的位置
    - 相減後得到，滑鼠在該元素 Y 軸的位置
- percent : 
    - y : 上述滑鼠在該元素的 Y 軸位置
    - offsetHeight : 該元素的高度
    - 相除後會得相對百分比的小數點
- height : 
    - 將 percent 的小數乘上 100 ，並透過 Math.round 四捨五入最接近的整數獲得百分比數字
    - + '%' 來置入屬性單位
- style.height : 
    - 獲取 bar 的 CSS 高度屬性
    - = 設置該屬性的數值
    - 這裡 height 以%為單位

---

## 控制影片速度
```javascript
...

function handleMove(e) {

    ... 

    const min = 0.4;
    const max = 4;
    const playbackRate = percent * ( max - min ) + min;
    bar.textContent = playbackRate.toFixed(2) + 'x';
    video.playbackRate = playbackRate;

}

speed.addEventListener('mousemove', handleMove)
```
- playbackRate :  
    - percent 假如為 0.5 (50%) ，
    - ( max - min ) 4 - 0.4 = 3.6
    - 0.5 * 3.6 = 1.8
    - 1.8 * 0.4 = 2.2
    - 藉此得到 4x 的 50% ， 2.2 這數值
- 透過 textContent 改變 bar 的內容 再加上 + 'x' 做個視覺化
- video 中的 playbackRate 可以獲取與設置影片的速度