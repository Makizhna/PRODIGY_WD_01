let startTime = 0;
let interval;
let isRunning = false;

document.getElementById("startStop").addEventListener("click", function () {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
        isRunning = false;
    } else {
        startTime = Date.now() - (startTime > 0 ? startTime : 0);
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
        isRunning = true;
    }
});

document.getElementById("reset").addEventListener("click", function () {
    clearInterval(interval);
    startTime = 0;
    isRunning = false;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("laps").innerHTML = "";
});

document.getElementById("lap").addEventListener("click", function () {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        document.getElementById("laps").appendChild(lapItem);
    }
});

function updateTime() {
    const elapsedTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
