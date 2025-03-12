const toggle = document.querySelector(".toggleInp");
const body = document.querySelector("body");
const wrapper = document.querySelector(".wrapper");
const secondsInput = document.querySelector(".numberOfSeconds");
const countdownDisplay = document.getElementById("countdown");
const buttons = document.querySelectorAll("button");
let countdown;
let countdownTime;
let isRunning = false;
let isLight = true;

const makeDark = () => {
    isLight = false;
    body.style.color = "white";
    body.style.backgroundColor = "black";
    body.style.backgroundImage = "url('darkBG.webp')";
    if(!isRunning) wrapper.style.backgroundColor = "rgba(17, 17, 17, 0.6)";
    secondsInput.style.backgroundColor = "white"
    secondsInput.style.color = "rgba(17, 17, 17)";
    buttons.forEach((element) => {
        element.style.backgroundColor = "white";
        element.style.color = "rgb(29, 28, 28)";
    })
};

const makeLight = () => {
    isLight = true;
    body.style.color = "black";
    body.style.backgroundColor = "white";
    body.style.backgroundImage = "url('lightBG.jpg')";
    secondsInput.style.backgroundColor = "rgba(17, 17, 17)"
    secondsInput.style.color = "white";
    if(!isRunning) wrapper.style.backgroundColor = "rgba(256, 256, 256, 0.6)";
    buttons.forEach((element) => {
        element.style.backgroundColor = "rgb(29, 28, 28)";
        element.style.color = "white";
    })
};

toggle.addEventListener("click", () => {
    if (toggle.checked) makeDark();
    else makeLight();
});

const getSeconds = () => {
    let seconds = parseInt(secondsInput.value, 10);
    if (isNaN(seconds) || seconds <= 0) return false;
    countdownTime = seconds;
    countdownDisplay.textContent = formatTime(countdownTime);
    return true;
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const tick = () => {
    if(countdownTime <= 0) {
        clearInterval(countdown);
        isRunning = false;
        return;
    }
    countdownTime--;
    countdownDisplay.textContent = formatTime(countdownTime);
    if(countdownTime > 10) wrapper.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
    if (countdownTime < 10 && countdownTime > 5) {
        wrapper.classList.add("flashing-yellow");
        wrapper.classList.remove("flashing-red");
    }
    if (countdownTime < 5) {
        wrapper.classList.add("flashing-red");
        wrapper.classList.remove("flashing-yellow"); 
    }
    if (countdownTime === 0) {
        wrapper.classList.remove("flashing-yellow", "flashing-red");
        if(!isLight) wrapper.style.backgroundColor = "rgba(17, 17, 17, 0.6)";
        else wrapper.style.backgroundColor = "rgba(256, 256, 256, 0.6)";
        document.querySelector("#start").style.opacity = 1;
    }
};


const start = () => {
    if (isRunning) return;  
    if(!getSeconds()) return;
    isRunning = true;
    document.querySelector("#start").style.opacity = 0.5;
    wrapper.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
    document.querySelector("#stop").style.opacity = 1;
    countdown = setInterval(tick, 1000);  
};

const stop = () => {
    clearInterval(countdown);
    if(!isRunning) return;
    isRunning = false;
    document.querySelector("#start").style.opacity = 1;
    document.querySelector("#stop").style.opacity = 0.5;
    if(!isLight) wrapper.style.backgroundColor = "rgba(17, 17, 17, 0.6)";
    else wrapper.style.backgroundColor = "rgba(256, 256, 256, 0.6)";
};

const reset = () => {
    clearInterval(countdown);
    isRunning = false;
    countdownDisplay.textContent = "00:00";
    secondsInput.value = "";
    document.querySelector("#start").textContent = "Start";
    document.querySelector("#start").style.opacity = 1;
    if(!isLight) wrapper.style.backgroundColor = "rgba(17, 17, 17, 0.6)";
    else wrapper.style.backgroundColor = "rgba(256, 256, 256, 0.6)"; 
    wrapper.classList.remove("flashing-yellow");
    wrapper.classList.remove("flashing-red");
};

document.querySelector("#start").addEventListener("click", start);
document.querySelector("#stop").addEventListener("click", stop);
document.querySelector("#reset").addEventListener("click", reset);
toggle.addEventListener("click", () => {
    if (toggle.checked) makeDark();
    else makeLight();
});