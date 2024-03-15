# Hold Shift to Check Multiple Checkboxes 個人筆記紀錄用
### 這次的課程是做一個類似gmail中的選取小功能，按住Shift可以把中間的項目一併選取。
- 題外話對我來說一開始真的不知道怎麼去跑他們的過程，直到把過程console.log都出來，再慢慢地推演才知道，瞬間茅舍頓開XDD
---
## 步驟
---
### 掛上事件監聽
```javascript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

checkboxes.forEach(checkbox => checkbox.addEventListener('click', 
handleCheck))
```
- 抓取每個checkbox
- 加上click監聽

---

```javascript

let lastChecked;
function handleCheck(e){
    console.log("this = ", this);

}
```
- 創建 handleCheck function
- 新增 lastChecked 變數

```javascript
function handleCheck(e){
    console.log("this = ", this);
    if(e.shiftKey && this.checked){
        console.log("Shift");
    }
    lastChecked = this;
}
```

- 監測同時按下 Shift 與 選取到該盒子
- 透過 console.log 得知 `this` 跟 `last` 的變化的位置。
---
- 
```javascript
function handleCheck(e){
    console.log("this = ", this);
    let inBetween = false;

    // Check if they had the shift key down
    // AND check that they are checking it 
    let inBetween = false;
    if(e.shiftKey && this.checked) {
        // go ahead and do what we please
        // leoop over every single checkbox
        checkboxes.forEach(checkbox => {
            console.log(checkbox);
            if(checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween; 
                console.log('STarting to check them inbetween!');
            }
            if(inBetween) {
                console.log(inBetween);
                checkbox.checked = true;
            }
        })
    }
    lastChecked = this;
    console.log("last=", lastChecked);
}
```
- 加入 `inBetween` 設置 `false`
- 在按下shift的同時去勾選當下的選項時， `forEach` 遍歷所有 checkbox ， 如果目前這選項是目前勾選的或是上一個勾選的(last會在所有程式跑完時才重新定義，所以還是上一個)，有達成其中一個判斷，就會把 `inBetween` 處在 `false` 的 `inBetween` 反轉成 `true` 直到再次觸發條件才將 `inBetween` 轉為 `false` 。
- 如下圖第一個因為是 `lastchecked` 觸發了 `inBetween` 反轉，直到 `forEach` 遍歷到目前點下去的盒子才又反轉回來，由於 `this` 這個盒子本身就打勾了所以就算變成 `false` 也沒差，接下來的盒子就又回到 `false` 狀態(我就是忽略了這點才一直搞不懂怎麼圈範圍的XD)，這樣一來就將中間盒子都定位好了
- 再加上判定 `inBetween` 的狀態去對每個盒子施加 `checked = true` 的屬性操作，這樣就可以在判定完第一個觸發條件後依序對中間盒子上打勾的狀態直到再次觸發上面的 `if` 把 `inBetween` 切換回 `false` 後續的遍歷的盒子就將不再加上打勾的屬性。

![alt text](https://i.imgur.com/Y7Olyza.png)


![alt text](https://i.imgur.com/VL7UIlZ.png)

----
## JS 完整代碼
- 最後加上 `console.log` 檢視了所有過程才悟懂流程，不過也是在影片中稍微聽懂些關鍵字，才能在回推的過程中知道怎麼做到的，突然感概英文好點的話，或許就不會這麼艱難的吧(?)
```javascript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;
function handleCheck(e){
    console.log("this = ", this);
    // Check if they had the shift key down
    // AND check that they are checking it 
    let inBetween = false;
    if(e.shiftKey && this.checked) {
        // go ahead and do what we please
        // leoop over every single checkbox
        checkboxes.forEach(checkbox => {
            console.log(checkbox);
            if(checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween; 
                console.log('STarting to check them inbetween!');
            }
            if(inBetween) {
                console.log(inBetween);
                checkbox.checked = true;
            }
        })
    }
    lastChecked = this;
    console.log("last=", lastChecked);
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', 
handleCheck))
```

---
### 額外參考
[區間選取/取消版本](https://guahsu.io/2017/07/JavaScript30-10-Hold-Shift-and-Check-Checkboxes/)