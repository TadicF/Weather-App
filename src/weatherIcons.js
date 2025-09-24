import { weatherUI } from "./domHandler";
import { weather } from "./index";

export async function getWeatherIcon(condition) {
  const link = await import(`./icons/${condition}.svg`)
  const response = await fetch(link.default, {mode: "cors"});
  const svgText = await processData(response);
  return svgText;
}

async function processData(data) {
  return data.text();
}

export async function prepareIcons(data) {
  await prepareWeeklyIcons(data);
  await prepareHourlyIcons(data);
  await prepareDailyIcon(data);
}

async function prepareWeeklyIcons(data) {
  for(let i = 0; i < 7; i++) {
    let icon = await getWeatherIcon(data.days[i].icon);
    weatherUI.weeklyIcons[i] = icon;
  };
}

async function prepareHourlyIcons(data) {
  for(let i = 0; i <= 23; i++) {
    let icon = await getWeatherIcon(data.days[0].hours[i].icon);
    weatherUI.hourlyIcons[i] = icon;
  }
}

 async function prepareDailyIcon(data) {
  let icon = await getWeatherIcon(data.currentConditions.icon);
  weatherUI.dailyIcon = icon;
}