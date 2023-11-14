class WeatherApp {
  constructor(apiKey, weatherDataContainer, queryInput, submitButton) {
    this.apiKey = apiKey;
    this.weatherDataContainer = weatherDataContainer;
    this.submitButton = submitButton;

    this.submitButton.addEventListener("click", () => { 
        const city = queryInput.value;
        this.clearWeatherDataContainer();
        this.getWeather(city);
    });
  }

  clearWeatherDataContainer() {
    this.weatherDataContainer.innerText = "";
  }

  async getWeather(city) {
    // dodac obsluge !fetch.ok
    const responseCoordinates = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    );
    const dataCoordinates = await responseCoordinates.json();
    const lat = dataCoordinates.coord.lat;
    const lon = dataCoordinates.coord.lon;
    // console.log(lat, lon);

    const responseWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
    const dataWeather = await responseWeather.json();

    console.log(dataWeather);

    for (const weatherInfo of dataWeather.list) {
      let singleWeatherdata = document.createElement("div");
      singleWeatherdata.classList.add("single-weather-data");
      singleWeatherdata.innerHTML = `        
        <div class="single-weather-data">
            <div class="icon">
                <img
                src="https://www.openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png"
                alt="weatherImg"
                >
            </div>
            <div class="weather-info">
                <div class="weather-date"><p>${weatherInfo.dt_txt}</p></div>
                    <div class="weather-temperature">
                      <p>${weatherInfo.main.temp}<span>°C</span></p>
                    </div>
                <div class="weather-feels-like"><p>${weatherInfo.main.feels_like}<span>°C</span></p></div>
                    <div class="weather-description">
                        <p>${weatherInfo.weather[0].description}</p>
                    </div>
                </div>
            </div>
        </div>`;

      this.weatherDataContainer.appendChild(singleWeatherdata);
    }
  }

  getCurrentweather() {
    return
  }
}

const app = new WeatherApp(
  "7ded80d91f2b280ec979100cc8bbba94",
  document.getElementById("weather-data-container"),
  document.getElementById("location"),
  document.getElementById("submit")
);
// document.getElementById("submit").addEventListener("click", () => {
//   app.getWeather("Szczecin, Poland");
// });
