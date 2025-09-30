import getWeatherData from "./weatherAPI";
import { weather } from "./index.js";
import { domController } from "./domHandler.js";
import { prepareIcons } from "./weatherIcons.js";
import { loadingController } from "./loadingComp.js";

const userInput = {
    searchButton: document.querySelector('#searchBtn'),
    searchInput: document.querySelector('#searchInput'),

    get getValue() {
      return this.searchInput.value;
    },

    initBtn() {
      this.searchButton.addEventListener('click', submitForm); 
    },
};

async function submitForm() {
  event.preventDefault();
  loadingController.show();
  const data = await getWeatherData(userInput.getValue);
  await prepareIcons(data);
  loadingController.hide();
  let location = getLocation(data);
  let temp = getTemp(data);
  let info = getInfo(data);
  let hourly = getHourly(data);
  let weekly = getWeekly(data);
  weather.update(location, temp, info, hourly, weekly);
  domController.load();
};

function getLocation(data) {
  let location = {
    city: checkLowerCase(data.resolvedAddress),
    timezone: data.timezone,
  }
  return location;
}

function getTemp(data) {
  let temp = {
    currTemp: data.currentConditions.temp,
    dateTime: data.currentConditions.datetime,
    condition: data.currentConditions.icon,
  }
  return temp;
}

function getInfo(data) {
  let info = {
    windSpeed: data.currentConditions.windspeed,
    humidity: data.currentConditions.humidity,
    precipitation: data.currentConditions.precipprob,
    uvIndex: data.currentConditions.uvindex,
  }
  return info;
}

function getHourly(data) {
  let hoursArr = [];
  for(let i = 0; i <= 23; i++) {
    hoursArr.push(data.days[0].hours[i])
  }

  let hourly = {
    hours: hoursArr,
  }
  return hourly;
}

function getWeekly(data) {
  let weeksArr = [];
  for(let i = 0; i < 7; i++) {
    weeksArr.push(data.days[i]);
  }

  let weekly = {
    weeks: weeksArr,
  }
  return weekly;
}

function checkLowerCase(input) {
  let string = input.charAt(0).toUpperCase() + input.slice(1);
  return string
}



export default userInput;