import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes');
const second = document.querySelector('[data-seconds]');

let msSelected = null;
let idInterval = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    msSelected = selectedDates[0].getTime();
    if (msSelected < new Date()) {
      Notify.failure('Please choose a date in the future.');
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

let object = {};

const onCountTime = () => {
  idInterval = setInterval(() => {
    const diff = msSelected - new Date().getTime();
    if (diff <= 0) {
      clearTimeout(idInterval);
      return;
    }
    object = convertMs(diff);
    onChangeContent(addLeadingZero(object));
  }, 1000);
};

function addLeadingZero(values) {
  const newValues = { ...values };
  const keys = Object.keys(newValues);
  for (const key of keys) {
    newValues[key] = String(newValues[key]).padStart(2, 0);
  }
  return newValues;
}

function onChangeContent({ days, hours, minutes, seconds }) {
  day.textContent = days;
  hour.textContent = hours;
  minute.textContent = minutes;
  second.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', onCountTime);
