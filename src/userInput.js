import getWeatherData from "./weatherAPI";
import { weather } from "./index.js";
import { domController } from "./domHandler.js";

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
  const data = await getWeatherData(userInput.getValue);
  console.log(data);
  let location = getLocation(data);
  let temp = getTemp(data);
  let info = getInfo(data);
  weather.update(location, temp, info);
  domController.load();
  console.log(weather.getLocation);
  console.log(weather.getTemp);
  console.log(weather.getInfo);
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
    condition: data.currentConditions.conditions,
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

function checkLowerCase(input) {
  let string = input.charAt(0).toUpperCase() + input.slice(1);
  return string
}



export default userInput;