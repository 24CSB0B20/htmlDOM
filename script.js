const toggle = document.querySelector(".toggleInp");
const body = document.querySelector("body");
const wrapper = document.querySelector(".wrapper");
const secondsInput = document.querySelector(".numberOfSeconds");
const inputList = document.querySelectorAll(".numberOfSeconds")
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
    if (!isRunning) wrapper.style.backgroundColor = "rgba(17, 17, 17, 0.6)";
    buttons.forEach(e => {
        e.style.backgroundColor = "white";
        e.style.color = "rgb(29, 28, 28)";
    });
    inputList.forEach(e => {
        e.style.backgroundColor = "white";
        e.style.color = "rgba(17, 17, 17)";
    })
};

const makeLight = () => {
    isLight = true;
    body.style.color = "black";
    body.style.backgroundColor = "white";
    body.style.backgroundImage = "url('lightBG.jpg')";
    secondsInput.style.backgroundColor = "rgba(17, 17, 17)";
    secondsInput.style.color = "white";
    if (!isRunning) wrapper.style.backgroundColor = "rgba(256, 256, 256, 0.6)";
    buttons.forEach(e => {
        e.style.backgroundColor = "rgb(29, 28, 28)";
        e.style.color = "white";
    });
    inputList.forEach(e => {
        e.style.backgroundColor = "rgba(17, 17, 17)";
        e.style.color = "white";
    })
};

toggle.addEventListener("click", () => toggle.checked ? makeDark() : makeLight());

const getSeconds = () => {
    let seconds = parseInt(secondsInput.value, 10);
    if (isNaN(seconds) || seconds <= 0) return false;
    countdownTime = seconds;
    countdownDisplay.textContent = formatTime(countdownTime);
    return true;
};

const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const tick = () => {
    if (countdownTime <= 0) {
        clearInterval(countdown);
        isRunning = false;
        return;
    }
    countdownTime--;
    countdownDisplay.textContent = formatTime(countdownTime);
    if (countdownTime > 10) wrapper.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
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
        wrapper.style.backgroundColor = isLight ? "rgba(256, 256, 256, 0.6)" : "rgba(17, 17, 17, 0.6)";
        document.querySelector("#start").style.opacity = 1;
    }
};

const start = () => {
    if (isRunning || !getSeconds()) return;
    isRunning = true;
    document.querySelector("#start").style.opacity = 0.5;
    wrapper.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
    document.querySelector("#stop").style.opacity = 1;
    countdown = setInterval(tick, 1000);
};

const stop = () => {
    clearInterval(countdown);
    if (!isRunning) return;
    isRunning = false;
    document.querySelector("#start").style.opacity = 1;
    document.querySelector("#stop").style.opacity = 0.5;
    wrapper.style.backgroundColor = isLight ? "rgba(256, 256, 256, 0.6)" : "rgba(17, 17, 17, 0.6)";
};

const reset = () => {
    clearInterval(countdown);
    isRunning = false;
    countdownDisplay.textContent = "00:00";
    secondsInput.value = "";
    document.querySelector("#start").textContent = "Start";
    document.querySelector("#start").style.opacity = 1;
    wrapper.classList.remove("flashing-yellow", "flashing-red");
    wrapper.style.backgroundColor = isLight ? "rgba(256, 256, 256, 0.6)" : "rgba(17, 17, 17, 0.6)";
};

document.querySelector("#start").addEventListener("click", start);
document.querySelector("#stop").addEventListener("click", stop);
document.querySelector("#reset").addEventListener("click", reset);

const addToList = () => {
    const input = document.getElementById("listInput");
    const list = document.getElementById("dataList");
    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = input.value.trim();
        list.appendChild(li);
        input.value = "";
    }
};

const sortList = () => {
    const list = document.getElementById("dataList");
    let items = Array.from(list.children);
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    list.innerHTML = "";
    items.forEach(item => list.appendChild(item));
};

const reverseList = () => {
    const list = document.getElementById("dataList");
    let items = Array.from(list.children).reverse();
    list.innerHTML = "";
    items.forEach(item => list.appendChild(item));
};

const removeDuplicates = () => {
    const list = document.getElementById("dataList");
    const seen = new Set();
    let items = Array.from(list.children).filter(item => {
        if (seen.has(item.textContent)) return false;
        seen.add(item.textContent);
        return true;
    });
    list.innerHTML = "";
    items.forEach(item => list.appendChild(item));
};

const addRow = () => {
    const name = document.getElementById("tableName").value.trim();
    const age = document.getElementById("tableAge").value.trim();
    if (name === "" || age === "") return;
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td contenteditable="true">${name}</td>
        <td contenteditable="true">${age}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
    tableBody.appendChild(row);
    document.getElementById("tableName").value = "";
    document.getElementById("tableAge").value = "";
};

const deleteRow = btn => {
    const row = btn.parentElement.parentElement;
    row.remove();
};

const openModal = src => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = src;
};

const closeModal = () => {
    document.getElementById("modal").style.display = "none";
};
