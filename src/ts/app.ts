const mainSelector = document.getElementById(`main`)!;

const submitBtnSelector = document.getElementById(`submit-btn`)!;

const startCounterWrapperSelector = document.querySelector(
  `.start-counter`
) as HTMLDivElement;
const startCounterSelector = document.querySelector(
  `.start-counter span`
) as HTMLSpanElement;

const gameNameSelector = document.getElementById(
  `game-name`
) as HTMLInputElement;

const player1InputNameSelector = document.getElementById(
  `player1`
) as HTMLInputElement;
const player2InputNameSelector = document.getElementById(
  `player2`
) as HTMLInputElement;

const tapPlaceSelector = document.querySelectorAll(`.tap-place`)!;

const timeSelector = document.getElementById(`time`) as HTMLInputElement;

const player1NameSelector = document.getElementById(`player1-name`)!;
const player2NameSelector = document.getElementById(`player2-name`)!;

const player1TimeSelector = document.getElementById(`player1-time`)!;
const player2TimeSelector = document.getElementById(`player2-time`)!;

const formWrapperSelector = document.querySelector(`.form-wrapper`)!;
const timerWrapperSelector = document.querySelector(`.timer-wrapper`)!;

const newGameBtnsSelector = document.querySelectorAll(`.new-game-btns`);

const timeRegex = /^\d{2}:\d{2}$/i;

let user1Interval: any;
let user2Interval: any;

window.addEventListener(`load`, () => {
  mainSelector.scrollIntoView(true);
});

submitBtnSelector.addEventListener(`click`, (e) => {
  e.preventDefault();

  let gameName: string = gameNameSelector.value.trim()
    ? gameNameSelector.value.trim()
    : "Chess";

  let player1Name: string = player1InputNameSelector.value.trim()
    ? player1InputNameSelector.value.trim()
    : "P1";

  let player2Name: string = player2InputNameSelector.value.trim()
    ? player2InputNameSelector.value.trim()
    : "P2";

  let gameTime: string = timeSelector.value.trim()
    ? timeSelector.value.trim()
    : "10:00";

  let isTimeCorrect = timeRegex.test(gameTime);

  if (!isTimeCorrect) {
    alert(`Enter Currect Time !`);
  } else {
    formWrapperSelector.classList.add(`d-none`);
    startCounterWrapperSelector.classList.remove(`d-none`);
    timerWrapperSelector.classList.remove(`d-none`);

    let startCounterInterval = setInterval(() => {
      let counter: number = Number(startCounterSelector.innerHTML);

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

    let userTarget = e.target as HTMLElement;
    decreaseTime(Number(userTarget.dataset.user), userTarget);
  });
});

newGameBtnsSelector.forEach((el) => {
  el.addEventListener(`click`, () => {
    location.reload();
  });
});

const decreaseTime = (userId: number, target: HTMLElement) => {
  const addLeadingZero = (num: number): string =>
    num < 10 ? `0${num}` : `${num}`;

  clearInterval(user2Interval);
  clearInterval(user1Interval);

  if (userId === 1) {
    let timeSeparator = player1TimeSelector.innerHTML.split(`:`);

    let minute: number = Number(timeSeparator[0]);
    let second: number = Number(timeSeparator[1]);

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

      player1TimeSelector.innerHTML = `${addLeadingZero(
        minute
      )}:${addLeadingZero(second)}`;
    }, 1000);
  }

  if (userId === 2) {
    let timeSeparator = player2TimeSelector.innerHTML.split(`:`);

    let minute: number = Number(timeSeparator[0]);
    let second: number = Number(timeSeparator[1]);

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

      player2TimeSelector.innerHTML = `${addLeadingZero(
        minute
      )}:${addLeadingZero(second)}`;
    }, 1000);
  }
};
