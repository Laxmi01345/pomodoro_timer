let focusButton = document.getElementById("focus");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longBreak");
let startBtn = document.getElementById("btn-start");
let pauseBtn = document.getElementById("btn-pause");
let resetBtn = document.getElementById("reset");
let timeDisplay = document.getElementById("time");

let set;
let active = "focus";
let count = 0;
let minCount = 25;
let paused = true;

const appendZero = (value) => {
    return value < 10 ? `0${value}` : value;
};

const updateDisplay = () => {
    timeDisplay.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
};

const startTimer = () => {
    set = setInterval(() => {
        if (count === 0 && minCount === 0) {
            clearInterval(set);

            paused = true;
        } else {
            if (count === 0) {
                count = 59;
                minCount--;
            } else {
                count--;
            }
            updateDisplay();
        }
    }, 1000);
};

const pauseTimer = () => {
    clearInterval(set);
    paused = true;
};

const resetTimer = () => {
    pauseTimer();
    switch (active) {
        case "long":
            minCount = 15;
            break;
        case "short":
            minCount = 5;
            break;
        default:
            minCount = 25;
            break;
    }
    count = 0;
    updateDisplay();
};

const toggleStartPause = () => {
     const startButton = document.getElementById("btn-start");
    const resetButton = document.getElementById("reset");

    if (paused) {
        paused = false;
        startTimer();
        startButton.classList.add("hide");
        
        resetButton.classList.remove("hide");
    } else {
        paused = true;
        pauseTimer();
        startButton.classList.add("hide");
        
        resetButton.classList.add("hide");
    }
};

const initializeTimer = () => {
    minCount = 25;
    count = 0;
    updateDisplay();
};

// Call the initializeTimer function when the page loads
window.addEventListener("load", initializeTimer);

focusButton.addEventListener("click", () => {
    active = "focus";
    resetTimer();
});

shortBreakButton.addEventListener("click", () => {
    active = "short";
    resetTimer();
});

longBreakButton.addEventListener("click", () => {
    active = "long";
    resetTimer();
});

pauseBtn.addEventListener("click", () => {
    pauseTimer();
});

startBtn.addEventListener("click", () => {
    toggleStartPause();
});

resetBtn.addEventListener("click", () => {

    resetTimer();

});
