class WeatherApp {
  constructor(apiKey, weatherDataContainer, queryInput, submitButton) {
    this.apiKey = apiKey;
    this.weatherDataContainer = weatherDataContainer;
    this.submitButton = submitButton;

    this.submitButton.addEventListener("click", async () => {
      const city = queryInput.value;
      this.clearWeatherDataContainer();

      const { lat, lon } = await this.getCoordinates(city);
      if (lat !== undefined && lon !== undefined) {
        this.getCurrentWeather(lat, lon);
        this.getWeather(lat, lon);
      }
    });
  }

  clearWeatherDataContainer() {
    this.weatherDataContainer.innerText = "";
  }

  async getCoordinates(city) {
    let lat;
    let lon;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
      );

      if (response.status === 404) {
        throw new Error("City not found");
      }
      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(city, ": ", lat, lon);
      return { lat, lon };
    } catch (error) {
      console.log(error);
      lat = undefined;
      lon = undefined;
      alert("City not found");
    }
    return { lat, lon };
  }

  createWeatherDataCard(weatherData, api = "forecast") {
    let date;
    if (api === "forecast") {
      date = weatherData.dt_txt;
    } else if (api === "current") {
      date = new Date(weatherData.dt * 1000);

      date = date
        .toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(",", "")
        .replaceAll(".", "-");
    }
    const icon = weatherData.weather[0].icon;
    const temperature = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const description = weatherData.weather[0].description;

    const singleWeatherdata = document.createElement("div");
    singleWeatherdata.classList.add("single-weather-data");
    singleWeatherdata.innerHTML = `      
      <div class="icon">
      <img
      src="https://www.openweathermap.org/img/w/${icon}.png"
      alt="weatherImg"
      >
      </div>
      <div class="weather-info">
      <div class="weather-date"><p>${date}</p></div>
      <div class="weather-temperature">
      <p>Temperature: ${temperature}<span>°C</span></p>
      </div>
      <div class="weather-feels-like"><p>Feels like: ${feelsLike}<span>°C</span></p></div>
      <div class="weather-description">
      <p>Description: ${description}</p>
      </div>
      </div>
    `;

    return singleWeatherdata;
  }

  async getWeather(lat, lon) {
    try {
      const responseWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );

      if (!responseWeather.ok) {
        throw new Error();
      }
      const dataWeather = await responseWeather.json();

      console.log("5 day forecast: ", dataWeather);

      for (const weatherData of dataWeather.list) {
        const singleWeatherCard = this.createWeatherDataCard(
          weatherData,
          "forecast"
        );

        this.weatherDataContainer.appendChild(singleWeatherCard);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentWeather(lat, lon) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
        true
      );
      xhr.addEventListener("load", () => {
        if (xhr.status !== 200) {
          throw new Error();
        }
        const currentWeatherData = JSON.parse(xhr.responseText);
        console.log("current weather: ", currentWeatherData);

        const currentWeatherCard = this.createWeatherDataCard(
          currentWeatherData,
          "current"
        );
        this.weatherDataContainer.appendChild(currentWeatherCard);
      });

      xhr.send(null);
    } catch (error) {
      console.log(error);
    }
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
