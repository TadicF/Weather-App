const WeatherData = (() => {
  class Weather {
    constructor(location, temp, info) {
      this.location = {};
      this.temp = {};
      this.info = {};
    };

    update(location, temp, info) {
      this.location = location;
      this.temp = temp;
      this.info = info;
    }

    reset() {
      this.city = {};
      this.temp = {};
      this.info = {};
    }

    get getLocation() {
      return this.location;
    }

    get getTemp() {
      return this.temp;
    }

    get getInfo() {
      return this.info;
    }
  }

  return Weather;
})();



export default WeatherData;