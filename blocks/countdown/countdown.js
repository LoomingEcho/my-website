let secondsLeft;
let countInterval;
let initialSeconds;

const getSecondsLeft = () => Math.max(0, secondsLeft !== undefined ? secondsLeft : initialSeconds);

const addLeadingZero = (inNumber) => `${inNumber < 10 ? '0' : ''}${inNumber.toString()}`;

const renderCountdownNumber = (curNumber, label) => {
  const wrapperElement = document.createElement('div');
  const countdownNumberElement = document.createElement('span');
  const countdownNumberLabelElement = document.createElement('span');

  countdownNumberElement.innerText = addLeadingZero(curNumber);
  countdownNumberLabelElement.innerText = label;

  countdownNumberElement.classList.add('countdown__number');
  countdownNumberLabelElement.classList.add('countdown__number-label');
  wrapperElement.classList.add('countdown__number-box');

  wrapperElement.appendChild(countdownNumberElement);
  wrapperElement.appendChild(countdownNumberLabelElement);

  return wrapperElement;
};

const getRenderArgs = () => {
  let seconds = getSecondsLeft();
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const renderSeparator = () => {
  const separator = document.createElement('span');
  separator.classList.add('countdown__separator');
  separator.innerText = ':';

  return separator;
};

const renderAsync = async (block) => {
  block.textContent = '';

  const {
    days, hours, minutes, seconds,
  } = getRenderArgs();

  block.append(renderCountdownNumber(days, 'Days'));
  block.append(renderSeparator());
  block.append(renderCountdownNumber(hours, 'Hours'));
  block.append(renderSeparator());
  block.append(renderCountdownNumber(minutes, 'Minutes'));
  block.append(renderSeparator());
  block.append(renderCountdownNumber(seconds, 'Seconds'));
};

const update = async (block) => {
  await renderAsync(block);
  if (getSecondsLeft() === 0) {
    clearInterval(countInterval);
  } else {
    secondsLeft -= 1;
  }
};

export default function decorate(block) {
  initialSeconds = Number(block.children[0].children[0].innerText);
  secondsLeft = getSecondsLeft();
  countInterval = setInterval(() => update(block), 1000);
}
