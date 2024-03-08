# Fun with HTML 5 Canvas 個人筆記紀錄用

## 流程
- 設置事件監聽
- 設定畫布
- 設定筆刷
- 筆刷特效


## 事件監聽
- `mousedown` 滑鼠按下
- `mousemove` 滑鼠移動
- `mouseup` 滑鼠放開
- `mouseout` / `mouseleave` 滑鼠離開
    - mouseout:
    在滑鼠指針離開元素時觸發。它會在滑鼠指針離開元素的任何子元素時觸發，即使它正在穿過父元素的邊界。這意味著當滑鼠指針 ==移出元素的任何子元素時，mouseout 事件都會被觸發==。
    - mouseleave：
    mouseleave 與 mouseout 類似，但有一個重要的區別：它只在滑鼠指針離開元素時觸發，不會在滑鼠指針穿過元素的任何子元素時觸發。換句話說，當滑鼠指針移出元素的邊界時，mouseleave 事件被觸發，但當滑鼠指針 ==進入元素的任何子元素時，不會觸發該事件==。
```javascript
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```

---

## 設定畫布
- 取得畫布，並取得上下文
```javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
```
- 設定畫布大小
```javascript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```
---

## 筆刷設定
- `strokeStyle` 筆刷顏色
- `lineJoin` 筆刷轉折處 round 圓滑 / bevel 有修飾，類似被削斷了一樣 / miter 無修飾拐角 [ref](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin#comparison_of_line_joins)
- `lineCap` 筆刷收尾 butt 矩形/ round 圓滑(有延伸) / square 矩形(有延伸) [ref](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap#comparison_of_line_caps)
- `lineWidth` 筆刷寬度

```javascript
ctx.strokeStyle = '#DD6FFF';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
```
---

## 開始繪畫
- `beginPath()` 開始繪畫路徑。
- `moveTo()` 從哪裡開始畫，將筆移動到該位置，但不會繪畫留下痕跡。
- `lineTo()` 畫線到指定位置。
- `stroke()` 畫，渲染moveTo()跟lineTo()定義的路徑
- `closePath()` 當前子路徑的結束點與起始點相連，某些情況下，它是必要的；而對於其他情況，它可能是多餘的。
```javascript
ctx.beginPath();
//start from
ctx.moveTo(lastX, lastY);
//go to 
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
```
---

## 筆刷特效

- 不知道甚麼原因導致在自己的主機端上DEMO，筆刷變化太快了，因此從 `-- / ++` 改成 `+=` 去減緩該速度的變化。
- 影片中的網站 [鏈結](https://mothereffinghsl.com/)
- 透過這網站可以明確的知道調整hsl中的第一個值 `色相(hue)` ，可以方便且柔和的更換顏色
- 先建立初始變數
```javascript
let hue = 0;
let direction = true
```

- 隨著執行次數增加去增加hue的第一個值
- 大於360時，歸零來達到循環。
```javascript
ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
hue += 0.2;
if(hue >= 360){
    hue = 0;
}
```
- 筆刷大小跟顏色的作法大同小異
- 設定最大值跟最小值
- 透過 `direction` 變數的 `true` 與 `false` 來做加減的判定

```javascript
if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction = !direction;
}
if(direction){
    ctx.lineWidth += 0.2;
}else{
    ctx.lineWidth -= 0.2;
}
```
