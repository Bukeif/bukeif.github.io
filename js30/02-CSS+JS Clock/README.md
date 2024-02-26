# CSS + JS Clock 個人筆記紀錄用

######
利用CSS和JS刻出一個簡單的時鐘特效
---
### CSS
- `transform : rotate(90deg);` :旋轉角度
- `transform-origin: 100%;` :旋轉的中心點位移
- 以上兩個CSS 搭配起來將 物件旋轉到90度 並且是該物件的最右邊為中心點在旋轉(origin 100%為X軸的最右端)
- `transition-timing-function: cubic-bezier(0.9, 0.54, 0.26, 1.68);` : 秒針回彈特效，透過貝茲曲線設定頓點。[transition時間線](https://www.casper.tw/css/2013/08/24/css-transtion-speed/)
- `transition: all 0.05s;` :所有動畫時間為0.05s
---
### JS
- `setInterval(setDate,1000);` :JS計時器於特定點呼叫指定function
- `const now = new Date();` :取得現在時間
- 分別取得秒、分、時的函式
```javascript
    const sec = now.getSeconds();
    const mins = now.getMinutes();
    const hour = now.getHours();
```
---
### 細修
- 透過 `border-radius` 將秒針與時針修尖與圓滑
- 修正指針在轉一圈會先逆時針回原點的亂象
    - [Ref](https://github.com/soyaine/JavaScript30/tree/master/02%20-%20JS%20%2B%20CSS%20Clock#%E6%96%B9%E6%B3%95%E4%B8%80)
---
### 時間的角度所需
- 分針每秒前進的角度
    - 1h => 360deg 
    - 1min => 360/60=6deg
    - 1min => 360/60/60=0.1deg
- 時針每秒前進的角度
    - 12h => 360deg
    - 1h => 360/12 = 30deg
    - 1min => 360/12/60=0.5deg

---
# 參考資料/資源
- [JavaScript30](https://javascript30.com/)


