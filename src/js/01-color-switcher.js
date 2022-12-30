const btn = document.querySelectorAll('button');
btn[1].disabled = true;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let myInterval;
function setColor() {
  let background = document.body;
  background.style.backgroundColor = getRandomHexColor();
  btn[0].disabled = true;
  btn[1].disabled = false;
}

function stopColor() {
  clearInterval(myInterval);
  btn[0].disabled = false;
  btn[1].disabled = true;
}
btn[0].addEventListener('click', e => {
  myInterval = setInterval(setColor, 500);
  setColor();
});
btn[1].addEventListener('click', e => {
  stopColor();
});
