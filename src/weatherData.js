const WeatherData = (() => {
  class Weather {
    constructor(city, temp, info) {
      this.city = {};
      this.temp = {};
      this.info = {};
    };

    update(city, temp, info) {
      this.city = city;
      this.temp = temp;
      this.info = info;
    }

    reset() {
      this.city = {};
      this.temp = {};
      this.info = {};
    }

    get getCity() {
      return this.city;
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