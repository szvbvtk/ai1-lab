class WeatherApp {
  constructor(apiKey, weatherDataContainer, searchBar, submitButton) {
    this.apiKey = apiKey;
    this.weatherDataContainer = weatherDataContainer;
    this.submitButton = submitButton;

    this.submitButton.addEventListener("click", async () => {
      const city = searchBar.value;
      this.clearWeatherDataContainer();

      const { lat, lon, msg } = await this.getCoordinates(city);
      if (msg === null) {
        this.getCurrentWeather(lat, lon);
        await this.getWeatherForecast(lat, lon);
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.id = "info-message";
        errorMessage.innerText = msg;
        this.weatherDataContainer.appendChild(errorMessage);
      }
    });
  }

  clearWeatherDataContainer() {
    this.weatherDataContainer.innerText = "";
  }

  async getCoordinates(city) {
    let lat;
    let lon;
    let errorMessage = null;
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error("Connection error");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("City not found, try again");
      }

      lat = data[0].lat;
      lon = data[0].lon;
      console.log(city, ": ", lat, lon);
    } catch (error) {
      console.log(error.message);
      errorMessage = error.message;
      lat = undefined;
      lon = undefined;
    }
    return { lat, lon, msg: errorMessage };
  }

  createWeatherEntry(weatherData) {
    let date = new Date(weatherData.dt * 1000);

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

    const icon = weatherData.weather[0].icon;
    const temperature = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const description = weatherData.weather[0].description;

    const weatherEntry = document.createElement("div");
    weatherEntry.classList.add("weather-entry");
    weatherEntry.innerHTML = `      
      <div class="weather-icon">
      <img
      src="https://www.openweathermap.org/img/w/${icon}.png"
      alt="weatherImg"
      >
      </div>
      <div class="weather-details">
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

    return weatherEntry;
  }

  async getWeatherForecast(lat, lon) {
    try {
      const responseWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );

      if (!responseWeather.ok) {
        throw new Error("Connection error");
      }
      const data = await responseWeather.json();

      console.log("5 day forecast: ", data);

      for (const weatherData of data.list) {
        const weatherEntry = this.createWeatherEntry(weatherData);

        this.weatherDataContainer.appendChild(weatherEntry);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  getCurrentWeather(lat, lon) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
        true
      );
      xhr.addEventListener("load", () => {
        if (xhr.status !== 200) {
          throw new Error("Connection error");
        }
        const data = JSON.parse(xhr.responseText);
        console.log("current weather: ", data);

        const currentWeatherEntry = this.createWeatherEntry(data);
        currentWeatherEntry.id = "current-weather-entry";
        this.weatherDataContainer.appendChild(currentWeatherEntry);
      });

      xhr.send(null);
    } catch (error) {
      console.log(error.message);
    }
  }
}

window.addEventListener("load", () => {
  const app = new WeatherApp(
    "7ded80d91f2b280ec979100cc8bbba94",
    document.getElementById("weather-results"),
    document.getElementById("location"),
    document.getElementById("submit")
  );
});
