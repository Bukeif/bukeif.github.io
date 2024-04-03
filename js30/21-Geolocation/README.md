# 21-Geolocation 個人筆記整理用

這次的課程做的比較簡單，使用 Navigator.geolocation 物件，獲取使用者的位置資訊

# 過程

- 抓取位置資訊
- 抽換當前資料

---

# 抓取資料
```javascript
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
    console.log(data);
});
```
- navigator.geolocationy : 網頁瀏覽器提供的JavaScript API，用於取得使用者設備的地理位置。 [ref](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
- watchPosition() 以監控方式取得當前位置
![alt text](https://i.imgur.com/DoxQ40Y.png)
- accurency 目前位置的準確度
- heading 目前位置的指向
- latitude, longitude 經度 緯度
- speed 當前速度

# 抽換內容
```javascript
navigator.geolocation.watchPosition((data) => {
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    }, (err) => {
    console.error(err);
});
```
- 知道資訊後就開始把HTML內的元素抽出來做替換
- 同時也把 err 無法取得位置資訊時的處理方式，大多在使用者不准許取得位置資訊

# 網頁折衷呈現方式

由於電腦本身好像也沒有速度跟方位的資訊，但還是可以獲得經緯度，因此就用了抓取經緯度連到MAP的方式做。
```html
<h1 class="lat-lon">
    <span class="units">latitude : </span>
    <span class="lat-value">0</span>
</h1>
<h1 class="lat-lon">
    <span class="units">Longitude :</span>
    <span class="lon-value">0</span>
</h1>
<a id="maplink" href="#" target="_blank">🗺️</a>
```
```css
.units {
    font-size: 20px;
}
.lat-lon{
    display: flex;
    flex-direction: column;
}
.lat-lon span:last-child {
    font-size: 25px;
}
```
```javascript
navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    

    const latdata = data.coords.latitude;
    const londata = data.coords.longitude;
    lat.textContent = latdata;
    lon.textContent = londata;
    let maplink = `https://www.google.com.tw/maps/@${latdata},${londata},16z?entry=ttu`;
    map.href = maplink;
    }, (err) => {
    console.error(err);
});
```
![alt text](https://i.imgur.com/opr1TZl.png)
