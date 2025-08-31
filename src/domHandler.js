import { weather } from "./index.js";
import "./styles.css";

export const domController = {
  uiLoaded: false,
  hourlyReport: true,
  weeklyReport: false,
  load: () => { loadUI()},
  display: () => { displayWeatherUI()},
  update: () => { updateWeatherUI()},
};

function loadUI() {
  if(domController.uiLoaded) {
    domController.update();
  } else {
    domController.display();
    domController.uiLoaded = true;
  }
};

// Functions for creating UI

function displayWeatherUI() {
  const weatherWrapper = document.querySelector('.weatherWrapper');

  const weatherContainer = createDiv('weatherContainer');
  weatherWrapper.appendChild(weatherContainer);

  const timeDisplayContainer = createDiv('timeDisplayContainer');
  weatherWrapper.appendChild(timeDisplayContainer);

  const locationContainer = createDiv('locationContainer')
  weatherContainer.appendChild(locationContainer);
  const uvContainer = createDiv('uvContainer');
  weatherContainer.appendChild(uvContainer);
  const tempContainer = createDiv('tempContainer');
  weatherContainer.appendChild(tempContainer);
  const infoContainer = createDiv('infoContainer');
  weatherContainer.appendChild(infoContainer);
  const timeReportDiv = createDiv('timeReportDiv');
  weatherContainer.appendChild(timeReportDiv);
  const timeDisplay = createDiv('timeDisplay');
  timeDisplayContainer.appendChild(timeDisplay);

  displayLocation();
  displayUv();
  displayTemp();
  displayInfo();
  displayTimeReport();
  displayHourlyReport();
};

function displayLocation() {
  const locationContainer = document.querySelector('.locationContainer');
  const cityDiv = createDiv('cityDiv');
  locationContainer.appendChild(cityDiv);
  const timezoneDiv = createDiv('timezoneDiv');
  locationContainer.appendChild(timezoneDiv);

  const city = document.createElement('p');
  cityDiv.appendChild(city);
  checkCityLength();
  city.textContent = weather.location.city;
  

  const timezone = document.createElement('p');
  timezone.textContent = weather.location.timezone;
  timezoneDiv.appendChild(timezone);
};

function displayUv() {
  const uvContainer = document.querySelector('.uvContainer');
  const uvIndexText = createDiv('uvIndexText');
  uvContainer.appendChild(uvIndexText);
  const uvIndexScale = createDiv('uvIndexScale');
  uvContainer.appendChild(uvIndexScale);

  const text = document.createElement('p');
  text.textContent = 'UV Index Scale';
  uvIndexText.appendChild(text);

  displayUvIndexScale();
}

function displayUvIndexScale() {
  const uvIndexScale = document.querySelector('.uvIndexScale');
  const lowIndex = createWrapper('lowIndex', 'lowIndexNum', 'lowIndexText');
  const moderateIndex = createWrapper('moderateIndex', 'moderateIndexNum', 'moderateIndexText');
  const highIndex = createWrapper('highIndex', 'highIndexNum', 'highIndexText');
  const veryHighIndex = createWrapper('veryHighIndex', 'veryHighIndexNum', 'veryHighIndexText');
  const extremeIndex = createWrapper('extremeIndex', 'extremeIndexNum', 'extremeIndexText');
  uvIndexScale.appendChild(lowIndex);
  uvIndexScale.appendChild(moderateIndex);
  uvIndexScale.appendChild(highIndex);
  uvIndexScale.appendChild(veryHighIndex);
  uvIndexScale.appendChild(extremeIndex);

  for(let i = 0; i < 11; i++) {
    const div = createDiv(`index${i+1}`);
    div.textContent = `${i+1}`;
    if(i <= 1) {
      const parentDiv = document.querySelector('.lowIndexNum').appendChild(div);
    } else if(i <= 4) {
      const parentDiv = document.querySelector('.moderateIndexNum').appendChild(div);
    } else if(i <= 6) {
      const parentDiv = document.querySelector('.highIndexNum').appendChild(div);
    } else if(i <= 9) {
      const parentDiv = document.querySelector('.veryHighIndexNum').appendChild(div);
    } else {
      const parentDiv = document.querySelector('.extremeIndexNum').appendChild(div);
      div.textContent = `${i+1}+`;
    }

    checkUvLevel();
  }

  addPara('lowIndexText', 'Low');
  addPara('moderateIndexText', 'Moderate');
  addPara('highIndexText', 'High');
  addPara('veryHighIndexText', 'Very High');
  addPara('extremeIndexText', 'Extreme');
};

function displayTemp() {
  const tempContainer = document.querySelector('.tempContainer');
  const tempDateDiv = createDiv('tempDateDiv');
  tempContainer.appendChild(tempDateDiv);
  const dateDiv = createDiv('dateDiv');
  const tempDiv = createDiv('tempDiv');
  tempDateDiv.appendChild(dateDiv);
  tempDateDiv.appendChild(tempDiv);
  const conditionDiv = createDiv('conditionDiv');
  tempContainer.appendChild(conditionDiv);

  const date = document.createElement('p');
  const temp = document.createElement('p');
  const condition = document.createElement('p');
  // ---------- add condition icon ------------

  date.textContent = weather.temp.dateTime.slice(0, 5);
  temp.textContent = weather.temp.currTemp;
  condition.textContent = weather.temp.condition;
  dateDiv.appendChild(date);
  tempDiv.appendChild(temp);
  conditionDiv.appendChild(condition)
};

function displayInfo() {
  const infoContainer = document.querySelector('.infoContainer');
  const windDiv = createDiv('windDiv');
  const humidityDiv = createDiv('humidityDiv');
  const precipitationDiv = createDiv('precipitationDiv');
  infoContainer.appendChild(windDiv);
  infoContainer.appendChild(humidityDiv);
  infoContainer.appendChild(precipitationDiv);

  const wind = document.createElement('p');
  const humidity = document.createElement('p');
  const precipitation = document.createElement('p');

  wind.textContent = `Wind: ${weather.info.windSpeed}km/h`;
  humidity.textContent = `Humidity: ${weather.info.humidity}%`;
  precipitation.textContent = `Precipitation: ${weather.info.precipitation}%`;

  windDiv.appendChild(wind);
  humidityDiv.appendChild(humidity);
  precipitationDiv.appendChild(precipitation);
}

function displayTimeReport() {
  const timeReportDiv = document.querySelector('.timeReportDiv');
  const selectTimeDiv = createDiv('selectTimeDiv');
  timeReportDiv.appendChild(selectTimeDiv);

  const hourlyBtn = document.createElement('button');
  const weeklyBtn = document.createElement('button');
  hourlyBtn.textContent = 'Hourly';
  weeklyBtn.textContent = 'Weekly';
  hourlyBtn.classList.add('activeTime');
  weeklyBtn.classList.add('inactiveTime');

  selectTimeDiv.appendChild(hourlyBtn);
  selectTimeDiv.appendChild(weeklyBtn);
}

function displayHourlyReport() {
  const timeDisplay = document.querySelector('.timeDisplay');
  timeDisplay.classList.add('hourlyDisplay');

  for(let i = 0; i < 24; i++) {
    const hourlyDiv = createDiv('hourlyDiv');
    timeDisplay.appendChild(hourlyDiv);

    const hourlyTime = createDiv('hourlyTime');
    const hourlyTemp = createDiv('hourlyTemp');
    const hourlyCondition = createDiv('hourlyCondition');

    hourlyTime.textContent = `${i}`;
    hourlyTemp.textContent = `${i + 20}`;
    hourlyCondition.textContent = `[icon]`;

    hourlyDiv.appendChild(hourlyTime);
    hourlyDiv.appendChild(hourlyTemp);
    hourlyDiv.appendChild(hourlyCondition);
  }
}

function displayWeeklyReport() {

}

// Utility Functions

function checkCityLength() {
  const cityDiv = document.querySelector('.cityDiv');
  const city = cityDiv.children;
  console.log(city);
  if(weather.location.city.length > 12) {
    city[0].classList.add('longText')
  } else {
    city[0].classList.add('shortText')
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


// Functions for updating UI ->

function updateWeatherUI() {

};
