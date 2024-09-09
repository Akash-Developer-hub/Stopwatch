let startTime, updatedTime, difference, interval;
let running = false;

const display = document.getElementById("display");
const Pause = document.getElementById("pause");
const stopButton = document.getElementById("stop");

function formatTime(time) {
    const hours = Math.floor(time / 3600000);    // i used this so that the time retrived in milli seconds is converted to expected time format
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);
    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + ':' +  // 2 is the number of digit i want to show
        String(milliseconds).padStart(3, '0')
    );
}

function start() {
    running = true;
    Pause.textContent = 'Pause';
    startTime = new Date().getTime() - (difference || 0);
    interval = setInterval(() => {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime; // i used this to check the time in the watch if it is running or not
        display.textContent = formatTime(difference);
    }, 100);
}

function pause() {
    running = false;
    clearInterval(interval);
    Pause.textContent = 'Restart';
}

function restart() {
    start();
}

function stop() {
    clearInterval(interval);
    running = false;
    difference = 0;
    Pause.textContent = 'Start';
    display.textContent = "00:00:00:000";
}

Pause.addEventListener("click", () => {
    if (!running && Pause.textContent === 'Start') {
        start();
    } else if (running && Pause.textContent === 'Pause') {
        pause();
    } else if (!running && Pause.textContent === 'Restart') {
        restart();
    }
});

stopButton.addEventListener("click", stop);
