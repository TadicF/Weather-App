import weatherData from "./weatherData";
import userInput from "./userInput";


// Initialize the user input
userInput.initBtn();

// Create a new instance for observing weather data
export const weather = new weatherData();
