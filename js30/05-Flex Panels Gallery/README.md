# Flex Panels Gallery 個人筆記紀錄用
----
運用 `flex` 的特性及 `transition` 動畫效果，搭配做出點擊後控制板的效果。

----
### Flex啟用方式
- `display:flex;`
- `flex` 是一個彈性盒子布局的屬性
- 設置在父系時，底下子系元素將都會變成flex項目
---

### Flex-direction
控制彈性容器中主軸的方向，從而影響彈性項目的排列方式。
- `flex-direction: row;` 橫排(左到右);
- `flex-direction: column;` 直排。

---
### justify-content : 主軸對齊控制。
- 資料水平對齊: 主軸
    - `justify-content: flex-start;` 目將靠近主軸的起始端對齊。
    - `justify-content: center;` 項目將在主軸上居中對齊。
    - `justify-content: flex-end;` 項目將靠近主軸的終點端對齊。

---
### justify-content: 主軸對齊控制。
- 資料水平間距: 主軸
    - `justify-content: space-around;` 前後會有項目之間間隔的一半，間距平均分配到每個項目左右。
    - `justify-content: space-between;` 項目均勻分布在主軸上，前後位於各自的起始終點端對齊，間距平均分配到物件之間，不包括容器的起始端和終點端
---
### align-items: 交叉軸的對齊控制。
- 垂直對齊位置控制。
    - align-items: flex-start: 對齊資料起始位置對齊。
    - align-items: cneter: 對齊資料交叉軸居中位置
    - align-items: flex-end: 對齊資料末端位置對齊。
---
### Transition 轉換
---
語法:
```css
transition: 屬性 轉換時間 延遲執行時間 速度;
```
中文意思為“轉變”
顧名思義它就是為了改變兩個外觀間轉換的屬性，只要加上transition，
就可以補足兩個外觀間轉換的補間動畫，可以形成比較平滑的轉換，而不會過於生硬。

[引用](https://hackmd.io/lQGMdiIJTeKPJD7QJVMjuw?view)

---
### transform 跟 translate()
-  `transfor` CSS 屬性之一，應用於改變元素大小、形狀、方向、位置。
- `translate()` 用於水平和垂直移動。
---
##### transform: CSS 屬性
- 應用於元素的`平移（translate）`、`旋轉（rotate）`、`縮放（scale）`和`傾斜（skew）`等操作。
---
##### translate(): CSS 函式
- 水平和垂直方向重新定位元素。


