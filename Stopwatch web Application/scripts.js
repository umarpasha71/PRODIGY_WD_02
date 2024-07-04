let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let lapCounter = 1;

const startstopbutton = document.getElementById('startstopbutton');
const resetbutton = document.getElementById('resetbutton');
const lapbutton = document.getElementById('lapbutton');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startstopbutton.addEventListener('click', startStop);
resetbutton.addEventListener('click', reset);
lapbutton.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        startstopbutton.textContent = 'Pause';
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startstopbutton.textContent = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.textContent = '00:00:00';
    startstopbutton.textContent = 'Start';
    laps.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(lapTime);
        lapCounter++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    const milliseconds = time.getUTCMilliseconds();
    display.textContent =
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds) + ':' +
        (milliseconds > 99 ? milliseconds : milliseconds > 9 ? '0' + milliseconds : '00' + milliseconds);
}
