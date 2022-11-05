const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let min = 0;
let sec = 0;

startBtn.addEventListener("click", () => {//To start the timer
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;//The now method will give you the current date and time in milli seconds
        intervalId = setInterval(updateTime, 1000);//Begin timer
    }
});
pauseBtn.addEventListener("click", () => {
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;//This will save how much time has passed in milliseconds
        clearInterval(intervalId);//To pause the timer 
    }
});
resetBtn.addEventListener("click", () => {//To reset the timer
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    min = 0;
    sec = 0;
    timeDisplay.textContent = "00:00:00";
});

function updateTime(){//function to update time
    elapsedTime = Date.now() - startTime;//to calculate how much time have pass
    sec = Math.floor((elapsedTime / 1000) % 60);//make it 60 sec
    min = Math.floor((elapsedTime / (1000 * 60)) % 60);//make it 60 minutes
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);//make it 60 hours

    sec = pad(sec);
    min = pad(min);
    hrs = pad(hrs);

    timeDisplay.textContent = `${hrs}:${min}:${sec}`;

    function pad(unit){//To add 0 the seconds minutes and hours if the numbers are 1 like for example 1:1:1 the function will make it 01:07:09
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}
