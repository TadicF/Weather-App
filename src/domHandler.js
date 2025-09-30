import { weather } from "./index.js";
import { checkCityLength, createWrapper, createDiv, addPara, checkUvLevel, checkTimeDesignations, getWeekDay, getTemp } from "./utilityFunctions.js";
import "./styles.css";

export const domController = {
  uiLoaded: false,
  hourlyReport: true,
  weeklyReport: false,
  timeDesignation: '',
  temperatureUnit: 'F',
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

export const weatherUI = { 
  uvLevels: [],
  hours: [],
  weeks: [],
  hourlyIcons: [],
  weeklyIcons: [],
  dailyIcon: undefined,
}

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
  timeDisplay.classList.add('hourlyDisplay');
  timeDisplayContainer.appendChild(timeDisplay);

  displayLocation();
  displayUv();
  displayTemp();
  displayInfo();
  displayTimeReport();
  displayHourlyReport();
  switchTimeDisplay();
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

  // a reference to elements
  weatherUI.city = city;
  weatherUI.timezone = timezone;
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
    weatherUI.uvLevels.push(div);
  }
  checkUvLevel();
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

  // ---------- add condition icon ------------

  checkTimeDesignations();
  date.textContent = `${weather.temp.dateTime.slice(0, 5)} ${domController.timeDesignation}`;

  temp.textContent = `${getTemp(weather.temp.currTemp)}°${domController.temperatureUnit}`;

  dateDiv.appendChild(date);
  tempDiv.appendChild(temp);
  conditionDiv.innerHTML = weatherUI.dailyIcon;

  // reference to elements
  weatherUI.date = date;
  weatherUI.temp = temp;
  weatherUI.condition = conditionDiv;
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

  // reference to elements
  weatherUI.wind = wind;
  weatherUI.humidity = humidity;
  weatherUI.precipitation = precipitation;
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
  hourlyBtn.classList.add('hourlyBtn');
  weeklyBtn.classList.add('inactiveTime');
  weeklyBtn.classList.add('weeklyBtn');

  selectTimeDiv.appendChild(hourlyBtn);
  selectTimeDiv.appendChild(weeklyBtn);
}

function displayHourlyReport() {
  const timeDisplay = document.querySelector('.timeDisplay');

  for(let i = 0; i < 24; i++) {
    const hourlyDiv = createDiv('hourlyDiv');
    timeDisplay.appendChild(hourlyDiv);

    const hourlyTime = createDiv('hourlyTime');
    const hourlyTemp = createDiv('hourlyTemp');
    const hourlyCondition = createDiv('hourlyCondition');

    hourlyTime.textContent = `${weather.hourly.hours[i].datetime.slice(0, 5)}`;
    hourlyTemp.textContent = `${getTemp(weather.hourly.hours[i].temp)}°${domController.temperatureUnit}`;
    hourlyCondition.innerHTML = weatherUI.hourlyIcons[i];

    hourlyDiv.appendChild(hourlyTime);
    hourlyDiv.appendChild(hourlyTemp);
    hourlyDiv.appendChild(hourlyCondition);

    // Reference
    weatherUI.hours[i] = { hourlyTemp, hourlyCondition };
  }
}

function displayWeeklyReport() {
  const timeDisplay = document.querySelector('.timeDisplay');

  for(let i = 0; i < 7; i++) {
    const weeklyDiv = createDiv('weeklyDiv');
    timeDisplay.appendChild(weeklyDiv);

    const weekDay = createDiv(`weekDay${i}`);
    weekDay.classList.add('weekDay');
    const weekTemp = createDiv(`weekTemp${i}`);
    weekTemp.classList.add('weekTemp');
    const weekCondition = createDiv(`weekCondition${i}`);
    weekCondition.classList.add('weekCondition');

    const date = new Date(weather.weekly.weeks[i].datetime);
    const day = date.getDay(); // returns a numeric value based on day of the week

    weekDay.textContent = `${getWeekDay(day)}`;
    weekTemp.textContent = `${getTemp(weather.weekly.weeks[i].tempmin)}°${domController.temperatureUnit} - ${getTemp(weather.weekly.weeks[i].tempmax)}°${domController.temperatureUnit}`
    weekCondition.innerHTML = weatherUI.weeklyIcons[i];
    
    weeklyDiv.appendChild(weekDay);
    weeklyDiv.appendChild(weekTemp);
    weeklyDiv.appendChild(weekCondition);

    // Reference
    weatherUI.weeks[i] = {weekDay, weekTemp, weekCondition};
  }
}

function switchTimeDisplay() {
  const timeDisplay = document.querySelector(".timeDisplay");
  const hourlyBtn = document.querySelector('.hourlyBtn');
  const weeklyBtn = document.querySelector('.weeklyBtn');

  hourlyBtn.addEventListener('click', () => {
    if(!domController.hourlyReport === true) {
      timeDisplay.replaceChildren('');
      domController.hourlyReport = true;
      domController.weeklyReport = false;
      displayHourlyReport();
      timeDisplay.classList.add('hourlyDisplay');
      timeDisplay.classList.remove('weeklyDisplay');
      hourlyBtn.classList.add('activeTime');
      hourlyBtn.classList.remove('inactiveTime');
      weeklyBtn.classList.remove('activeTime');
      weeklyBtn.classList.add('inactiveTime');
    }
  });

  weeklyBtn.addEventListener('click', () => {
    if(!domController.weeklyReport === true) {
      timeDisplay.replaceChildren('');
      domController.weeklyReport = true;
      domController.hourlyReport = false;
      displayWeeklyReport();
      timeDisplay.classList.add('weeklyDisplay');
      timeDisplay.classList.remove('hourlyDisplay');
      weeklyBtn.classList.add('activeTime');
      weeklyBtn.classList.remove('inactiveTime');
      hourlyBtn.classList.remove('activeTime');
      hourlyBtn.classList.add('inactiveTime');
    }
  });
};

(function switchUnit() {
  let fBtn = document.querySelector('.fahrenheitBtn');
  let cBtn = document.querySelector('.celsiusBtn');

  fBtn.addEventListener('click', () => {
    if(domController.temperatureUnit === 'C') {
      domController.temperatureUnit = 'F';
      cBtn.classList.remove('active');
      cBtn.classList.add('non-active');
      fBtn.classList.add('active');
      fBtn.classList.remove('non-active');
      if(domController.uiLoaded) {
        updateTemp();
        if(domController.hourlyReport) {
        updateHours();
       } else { updateWeeks() };
      }
    };
  });

  cBtn.addEventListener('click', () => {
    if(domController.temperatureUnit === 'F') {
      domController.temperatureUnit = 'C';
      fBtn.classList.remove('active');
      fBtn.classList.add('non-active');
      cBtn.classList.add('active');
      cBtn.classList.remove('non-active');
      if(domController.uiLoaded) {
      updateTemp();
      if(domController.hourlyReport) {
        updateHours();
      } else { updateWeeks() };
     }
    };
  });
}());

// Functions for updating UI ->

function updateWeatherUI() {
  updateLocation();
  updateTemp();
  updateInfo();
  updateUvIndex();
  updateReport();
};

function updateLocation() {
  weatherUI.city.textContent = weather.location.city;
  checkCityLength();
  weatherUI.timezone.textContent = weather.location.timezone;
}

function updateTemp() {
  checkTimeDesignations();
  weatherUI.date.textContent = `${weather.temp.dateTime.slice(0, 5)} ${domController.timeDesignation}`;
  weatherUI.temp.textContent = `${getTemp(weather.temp.currTemp)}°${domController.temperatureUnit}`;
  weatherUI.condition.innerHTML = weatherUI.dailyIcon;
}

function updateInfo() {
  weatherUI.wind.textContent = `Wind: ${weather.info.windSpeed}km/h`;
  weatherUI.humidity.textContent = `Humidity: ${weather.info.humidity}%`;
  weatherUI.precipitation.textContent = `Precipitation: ${weather.info.precipitation}%`;
}

function updateUvIndex() {
  weatherUI.uvLevels.forEach(uv => {
    if(uv.classList.contains('activeUv')) {
      uv.classList.remove('activeUv');
    }
  })

  checkUvLevel();
}

function updateReport() {
  if(domController.hourlyReport) {
    updateHours();
  } else if(domController.weeklyReport) {
    updateWeeks();
  }
}

function updateHours() {
  for(let i = 0; i <= 23; i++) {
    weatherUI.hours[i].hourlyTemp.textContent = `${getTemp(weather.hourly.hours[i].temp)}°${domController.temperatureUnit}`;
    weatherUI.hours[i].hourlyCondition.innerHTML = weatherUI.hourlyIcons[i];
  }
}

function updateWeeks() {
  for(let i = 0; i < 7; i++) {
    const date = new Date(weather.weekly.weeks[i].datetime);
    const day = date.getDay(); // returns a numeric value based on day of the week
    weatherUI.weeks[i].weekDay.textContent = `${getWeekDay(day)}`;
    weatherUI.weeks[i].weekTemp.textContent = `${getTemp(weather.weekly.weeks[i].tempmin)}°${domController.temperatureUnit} - ${getTemp(weather.weekly.weeks[i].tempmax)}°${domController.temperatureUnit}`;
    weatherUI.weeks[i].weekCondition.innerHTML = weatherUI.weeklyIcons[i];
  }
}