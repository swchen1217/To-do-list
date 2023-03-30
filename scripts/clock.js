function updateDate(){
    let clocktime = document.getElementById("time");
    let datetime = new Date();
    let hour = datetime.getHours();
    let min = datetime.getMinutes();
    let sec = datetime.getSeconds();
    if(hour < 10){
        hour = '0' + hour;
    }
    if(min < 10){
        min = '0' + min;
    }
    if(sec < 10){
        sec = '0' + sec;
    }
    
    let clockString = `${hour}:${min}:${sec}`;
    clocktime.textContent = clockString;
}
let interval = 1000 // ms
updateDate();
setInterval(updateDate, interval);