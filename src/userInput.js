import getWeatherData from "./weatherAPI";
import { weather } from "./index.js";

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
  let address = getAddress(data);
  let temp = getTemp(data);
  let info = getInfo(data);
  weather.update(address, temp, info);
  console.log(weather.getCity);
  console.log(weather.getTemp);
  console.log(weather.getInfo);
};

function getAddress(data) {
  let address = {
    city: data.address,
    timezone: data.timezone,
  }
  return address;
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
    precipitation: data.currentConditions.precipprob
  }
  return info;
}



export default userInput;