import { domController } from "./domHandler";
import { weather } from "./index";

export async function getWeatherIcon(condition) {
  const link = await import(`./icons/${condition}.svg`)
  console.log(condition);
  const response = await fetch(link.default, {mode: "cors"});
  const svgText = await processData(response);
  return svgText;
}

async function processData(data) {
  return data.text();
}