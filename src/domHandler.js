import { hoursToMilliseconds } from "date-fns";
import { weather } from "./index.js";

export const domController = {
  uiLoaded: false,
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

  const weatherContainer = document.createElement('div');
  weatherContainer.classList.add('weatherContainer');
  weatherWrapper.appendChild(weatherContainer);

  const locationContainer = createDiv('locationContainer')
  weatherContainer.appendChild(locationContainer);
  const tempContainer = createDiv('tempContainer');
  weatherContainer.appendChild(tempContainer);
  const infoContainer = createDiv('infoContainer');
  weatherContainer.appendChild(infoContainer);
  const timeReportDiv = createDiv('timeReportDiv');
  weatherContainer.appendChild(timeReportDiv);

  displayLocation();
  displayTemp();
  displayInfo();
  displayTimeReport();
};

function createDiv(type) {
  const container = document.createElement('div');
  container.classList.add(type);
  return container;
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

function checkCityLength() {
  const cityDiv = document.querySelector('.cityDiv');
  const city = cityDiv.children;
  console.log(city);
  if(weather.location.city.length > 12) {
    city[0].classList.add('longText')
  } else {
    city[0].classList.add('shortText')
  }
}

// Functions for updating UI ->

function updateWeatherUI() {

};
