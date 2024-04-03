# 21-Geolocation 個人筆記整理用

這次的課程做的比較簡單，使用 Navigator.geolocation 物件，獲取使用者的位置資訊

watchPosition() 以監控方式取得當前位置

accurency 目前位置的準確度
heading 目前位置的指向
latitude, longitude 經度 緯度
speed 當前速度

知道資訊後就可以抽換HTML內的內容了

<script>
    const arrow = document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition((data) => {
        console.log(data);
        speed.textContent = data.coords.speed;
        arrow.style.transform = `rotate(${data.coords.heading}deg)`;
        }, (err) => {
        console.error(err);
    });

</script>