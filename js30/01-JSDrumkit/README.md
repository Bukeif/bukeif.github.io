# Drum kit 

只要是透過JS的event監聽HTML的標籤屬性，並做出相對應的變化
---
### html架構
- 每個按鍵都用div包住，並附加 `date-key` 的屬性，以此對應keycode的方式
- `audio` 的標籤也一樣加上對應的 `date-key`

---
### CSS 樣式
```css
text-transform: uppercase;
```
- 把字母轉大寫

---
### JavaScript
```javascript
function playsound(e){
    const audio = document.querySelector(`aud[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.k[data-key="${e.keyCode}"]`);
    if (!audio) return;//
    audio.currenTime = 0;
    audio.play();
    key.classList.add('playing');
}

const keys = document.querySelectorAll('.key');
window.addEventListener('keydown',playsound);

```
- 在視窗加上 `keydown` 事件監聽，以觸發 `playsound` 來判定 `audio` 中是否有對應的 `data-key` 作後續 `play` 與 `CSS` 的變化
```javascript
function removeTransition(e){
    if(e.propertyName !== 'transform')return;
    
    this.classList.remove('playing');
}
keys.forEach(key => key.addEventListen('transitionend',removeTransition));
```
- 抓取所有 `.key` 元素， 並加上 `transitionend`事件監聽，透過 `removeTransition` 來判定取消按鍵的特效