async function getWeatherData(location) {
  const API_KEY = '76V23C9BPJFK3BQDH8HTDFWZD';

  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`, {mode: "cors"});
  const weatherData = await processData(response);
  return weatherData;
}

function processData(data) {
  return data.json();
};

export default getWeatherData;

