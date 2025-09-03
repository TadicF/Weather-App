const WeatherData = (() => {
  class Weather {
    constructor(location, temp, info, hourly, weekly) {
      this.location = {};
      this.temp = {};
      this.info = {};
      this.hourly = {},
      this.weekly = {}
    };

    update(location, temp, info, hourly, weekly) {
      this.location = location;
      this.temp = temp;
      this.info = info;
      this.hourly = hourly;
      this.weekly = weekly;
    }

    reset() {
      this.city = {};
      this.temp = {};
      this.info = {};
      this.hourly = {};
      this.weekly = {};
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

    get getHourly() {
      return this.hourly;
    }

    get getWeekly() {
      return this.weekly;
    }
  }

  return Weather;
})();

export default WeatherData;