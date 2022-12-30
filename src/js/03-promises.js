import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const firstDelay = document.querySelector("[name='delay']");
const stepDelay = document.querySelector("[name='step']");
const amount = document.querySelector("[name='amount']");

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });

  return promise;
}

function onFormSubmit(e) {
  e.preventDefault();

  let FIRST_DELAY = Number(firstDelay.value);
  const STEP_DELAY = Number(stepDelay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, FIRST_DELAY)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    FIRST_DELAY += STEP_DELAY;
  }
}
formEl.addEventListener('submit', onFormSubmit);
