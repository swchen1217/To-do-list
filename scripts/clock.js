function updateTime() {
    let dateTime = new Date();
    let hour = dateTime.getHours();
    let min = dateTime.getMinutes();
    let sec = dateTime.getSeconds();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }

    let clockTime = document.getElementById("time");
    clockTime.textContent = `${hour} : ${min} : ${sec}`;
}

let interval = 1000 // ms
updateTime();
setInterval(updateTime, interval);