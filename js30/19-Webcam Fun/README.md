# 19-Webcam Fun 個人筆記整理用

這次課程是網頁視訊鏡頭的項目，並對畫面做出特效變化。

## 工具

由於本身桌機沒有視訊鏡頭，所以改用OBS的虛擬鏡頭，擷取電腦畫面當測試。

[OBS官網](https://obsproject.com/download)

另外有看到其他大大分享的方法，手機跟電腦下載ivcam即可將手機鏡頭轉為電腦視訊鏡頭的免費APP。

[鏡頭方式參考](https://ithelp.ithome.com.tw/articles/10302996)

# 流程
- 取得視訊畫面
- 畫面呈現Canvas
- 抓取Canvas畫面編碼，儲存圖片
- 畫面特效處理

# 取得視訊畫面

### ==`createObjectURL` no longer works with `mediaStream` objects. Instead, we need to set `video.srcObject = localMediaStream`==
- 影片下方作者有留言說現在的 `createObjectURL` 已經無法再跟 `mediaStreamobjects` 搭配使用，需要該換成用 `video.srcObject = localMediaStream` 。
- 一開始就是沒看到這條一直錯誤還以為虛擬鏡頭不能 =_=

```javascript
function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            // video.src = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error(`OH NO!!!`, err);
        })
        
}
```
- `navigator` 是可以存取使用者瀏覽器資訊的物件，這物件底下提供很多不同的屬性。 [ref](https://www.fooish.com/javascript/navigator.html)
- `mediaDevices.getUserMedia` 會提示使用者是否給予多媒體數據的許可，並產生 `MediaStream` 的物件，包含有 鏡頭、音訊
- 透過 `video.srcObject = localMediaStream` 來為 video 上片源


# Canvas繪圖

```javascript
function painToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);
}
video.addEventListener('canplay', painToCanvas);
```
![alt text](https://i.imgur.com/rVYrhZF.png)
- 這邊先抓取鏡頭的寬度與高度
- 抓取到的的數值為鏡頭輸出的解析度

---

```javascript
function painToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    },16)
}
```
- 回傳一個由 setInterval 計時器，所執行Canvas上繪製圖片
- `ctx.drawImage(圖片, x開始的位置, y開始的位置, 要畫多寬, 要畫多高)`

[ref](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)

# 抓取畫面編碼，儲存圖片

```javascript
function takePhoto() {
    //take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firsChild);
}
```
- `toDataURL()` : canvas中回傳含有圖像或參數設置的特定格式，預設為 image/png。

[ref](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLCanvasElement/toDataURL)
- `setAttribute()` : 對標籤修改或新增屬性。
[ref](https://ithelp.ithome.com.tw/articles/10249338)

# 畫面特效處理

```javascript
return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // mess with them
    // pixels = redEffect(pixels);
    console.log(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8;

    pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
```
- `getImageData()` : 可以指定 `x,y` 起始點與 `width,height` 範圍獲取該範圍畫布RGBA數據
- `putImageData()` : 將 `ImageData` 數據從指定位置上開始繪製

![alt text](https://i.imgur.com/DsY6Wch.png)

![alt text](https://www.twle.cn/static/i/canvas/canvas_imagedata_1.png)

[ImageData](https://www.twle.cn/l/yufei/canvas/canvas-basic-imagedata.html)
- data 上的數據展開，會得到一大串陣列
- 陣列中每四個元素，以 0123 為準，就代表第一格的 `RGBA` 數值
-  知道數值後就可以開始將 `ImageData` 送進不同函式內做變化

---
## 特效
- 以for 迴圈的方式起始 0 遍歷整個 data 每次都以四個為一組做編輯
- 編輯內容為該組前三個 RGB 去做更改 A 保持不變。
## 紅色濾鏡
```javascript
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
        
    }
    return pixels;
}
```
- 針對每組紅色數值做增強，並減弱綠色與藍色
- 依造針對增強的顏色不同，也可以做出不同的顏色濾鏡
- 全部 data編輯過後 return數值回去


---

## 色彩分離
```javascript
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // BLUE
        
    }
    return pixels;
}
```
- 將該組 RGB 數值，設為之前或之後數值，讓 RGB 呈現一定數值的位移偏差。
- `- = 向左 ; + = 向右`
```javascript
// pixels.data[i - 640 ] = pixels.data[i + 0]; // red
pixels.data[i + 2 - 640 ] = pixels.data[i + 2]; // BLUE
pixels.data[i +1 - 640 ] = pixels.data[i + 1]; // GREEN
```
![alt text](https://i.imgur.com/9ms1D81.png)
- 將藍色跟綠色同數值從原本的位置向左偏移640像素出來，原地保留紅色

- [網上大大詳細的教學](https://ithelp.ithome.com.tw/articles/10302996) 

---

## 綠幕效果

```html
<div class="rgb">
    <label for="rmin">Red Min:</label>
    <input type="range" min=0 max=255 name="rmin">
    <label for="rmax">Red Max:</label>
    <input type="range" min=0 max=255 name="rmax">
    <br>
    <label for="gmin">Green Min:</label>
    <input type="range" min=0 max=255 name="gmin">
    <label for="gmax">Green Max:</label>
    <input type="range" min=0 max=255 name="gmax">
    <br>
    <label for="bmin">Blue Min:</label>
    <input type="range" min=0 max=255 name="bmin">
    <label for="bmax">Blue Max:</label>
    <input type="range" min=0 max=255 name="bmax">
</div>
```

```javascript
function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    })

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            &&blue >= levels.bmin
            &&red <= levels.rmax
            &&green <= levels.gmax
            && blue <= levels.bmax) {
                //  take it out!
                pixels.data[i + 3] = 0;
            }
    }
    
    return pixels;
}
```
- 如果 最小值 <= 顏色 <= 最大值 RGBA 的 Alpha 將會是 0 ， 直接為透明



