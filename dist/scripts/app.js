"use strict";
const mainSelector = document.getElementById(`main`);
const submitBtnSelector = document.getElementById(`submit-btn`);
const startCounterWrapperSelector = document.querySelector(`.start-counter`);
const startCounterSelector = document.querySelector(`.start-counter span`);
const gameNameSelector = document.getElementById(`game-name`);
const player1InputNameSelector = document.getElementById(`player1`);
const player2InputNameSelector = document.getElementById(`player2`);
const tapPlaceSelector = document.querySelectorAll(`.tap-place`);
const timeSelector = document.getElementById(`time`);
const player1NameSelector = document.getElementById(`player1-name`);
const player2NameSelector = document.getElementById(`player2-name`);
const player1TimeSelector = document.getElementById(`player1-time`);
const player2TimeSelector = document.getElementById(`player2-time`);
const formWrapperSelector = document.querySelector(`.form-wrapper`);
const timerWrapperSelector = document.querySelector(`.timer-wrapper`);
const newGameBtnsSelector = document.querySelectorAll(`.new-game-btns`);
const timeRegex = /^\d{2}:\d{2}$/i;
let user1Interval;
let user2Interval;
window.addEventListener(`load`, () => {
    mainSelector.scrollIntoView(true);
});
submitBtnSelector.addEventListener(`click`, (e) => {
    e.preventDefault();
    let gameName = gameNameSelector.value.trim()
        ? gameNameSelector.value.trim()
        : "Chess";
    let player1Name = player1InputNameSelector.value.trim()
        ? player1InputNameSelector.value.trim()
        : "P1";
    let player2Name = player2InputNameSelector.value.trim()
        ? player2InputNameSelector.value.trim()
        : "P2";
    let gameTime = timeSelector.value.trim()
        ? timeSelector.value.trim()
        : "10:00";
    let isTimeCorrect = timeRegex.test(gameTime);
    if (!isTimeCorrect) {
        alert(`Enter Currect Time !`);
    }
    else {
        formWrapperSelector.classList.add(`d-none`);
        startCounterWrapperSelector.classList.remove(`d-none`);
        timerWrapperSelector.classList.remove(`d-none`);
        let startCounterInterval = setInterval(() => {
            let counter = Number(startCounterSelector.innerHTML);
            if (counter === 1) {
                startCounterWrapperSelector.classList.add(`d-none`);
                clearInterval(startCounterInterval);
            }
            startCounterSelector.innerHTML = (counter - 1).toString();
        }, 1000);
        document.title = gameName;
        player1NameSelector.innerHTML = player1Name;
        player2NameSelector.innerHTML = player2Name;
        player1TimeSelector.innerHTML = gameTime;
        player2TimeSelector.innerHTML = gameTime;
    }
});
tapPlaceSelector.forEach((el) => {
    el.addEventListener(`click`, (e) => {
        clearInterval(user1Interval);
        clearInterval(user2Interval);
        let userTarget = e.target;
        decreaseTime(Number(userTarget.dataset.user), userTarget);
    });
});
newGameBtnsSelector.forEach((el) => {
    el.addEventListener(`click`, () => {
        location.reload();
    });
});
const decreaseTime = (userId, target) => {
    const addLeadingZero = (num) => num < 10 ? `0${num}` : `${num}`;
    clearInterval(user2Interval);
    clearInterval(user1Interval);
    if (userId === 1) {
        let timeSeparator = player1TimeSelector.innerHTML.split(`:`);
        let minute = Number(timeSeparator[0]);
        let second = Number(timeSeparator[1]);
        user1Interval = setInterval(() => {
            second -= 1;
            if (second < 0) {
                second = 59;
                minute -= 1;
            }
            if (minute < 1) {
                target.classList.add(`bg-red`);
            }
            if (minute === 0 && second === 0) {
                clearInterval(user2Interval);
                clearInterval(user1Interval);
                startCounterWrapperSelector.classList.remove(`d-none`);
                startCounterSelector.innerHTML = `User ${userId} Lost :(`;
            }
            player1TimeSelector.innerHTML = `${addLeadingZero(minute)}:${addLeadingZero(second)}`;
        }, 1000);
    }
    if (userId === 2) {
        let timeSeparator = player2TimeSelector.innerHTML.split(`:`);
        let minute = Number(timeSeparator[0]);
        let second = Number(timeSeparator[1]);
        if (minute < 1) {
            target.classList.add(`bg-red`);
        }
        user2Interval = setInterval(() => {
            second -= 1;
            if (second < 0) {
                second = 59;
                minute -= 1;
            }
            if (minute < 1) {
                target.classList.add(`bg-red`);
            }
            if (minute === 0 && second === 0) {
                clearInterval(user2Interval);
                clearInterval(user1Interval);
                startCounterWrapperSelector.classList.remove(`d-none`);
                startCounterSelector.innerHTML = `User ${userId} Lost :(`;
            }
            player2TimeSelector.innerHTML = `${addLeadingZero(minute)}:${addLeadingZero(second)}`;
        }, 1000);
    }
};
