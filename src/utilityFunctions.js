import { weather } from "./index.js";
import { domController } from "./domHandler.js";
// Utility Functions

function checkCityLength() {
  const cityDiv = document.querySelector('.cityDiv');
  const city = cityDiv.children;
  if(weather.location.city.length > 12) {
    city[0].classList.add('longText')
    city[0].classList.remove('shortText');
  } else {
    city[0].classList.add('shortText')
    city[0].classList.remove('longText');
  }
};

function createWrapper(mainDiv, firstDiv, secondDiv) {
  const div = document.createElement('div');
  div.classList.add(mainDiv);

  const firstWrapper = document.createElement('div');
  firstWrapper.classList.add(firstDiv);
  div.appendChild(firstWrapper);

  const secondWrapper = document.createElement('div');
  secondWrapper.classList.add(secondDiv);
  div.appendChild(secondWrapper);

  return div;
};

function createDiv(type) {
  const container = document.createElement('div');
  container.classList.add(type);
  return container;
};

function addPara(div, paraText) {
  const myDiv = document.querySelector(`.${div}`);
  const para = document.createElement('p');
  para.textContent = paraText;
  myDiv.appendChild(para);
}

function checkUvLevel() {
  let uvLevel = weather.info.uvIndex;
  if(uvLevel === 0) { uvLevel++ };
  const index = document.querySelector(`.index${uvLevel}`);
  index.classList.add('activeUv');
}

function checkTimeDesignations() {
  let time = weather.temp.dateTime.slice(0, 5);
  let shortTime = time.slice(0, 1);
  if(shortTime == 0) {
    domController.timeDesignation = 'AM';
  } else {
    domController.timeDesignation = 'PM';
  }
}

function getWeekDay(num) {
  switch(num) {
    case 0:
      return 'Sunday';
      break;
    case 1:
      return 'Monday';
      break;
    case 2:
      return 'Tuesday';
      break;
    case 3:
      return 'Wednesday';
      break;
    case 4:
      return 'Thursday';
      break;
    case 5:
      return 'Friday';
      break;
    case 6:
      return 'Saturday';
      break;
  }
}

function getTemp(temp) {
  if(domController.temperatureUnit === 'F') {
    return temp;
  } else if(domController.temperatureUnit === 'C') {
    let cTemp = (temp - 32) / (9 / 5);
    return cTemp.toFixed(1);
  }
}

export { checkCityLength, createWrapper, createDiv, addPara, checkUvLevel, checkTimeDesignations, getWeekDay, getTemp };