document.addEventListener("DOMContentLoaded", function () {
  // Function to update weather information based on API response
  function refreshWeather(response) {
    // Select elements
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");

    // Convert Unix timestamp to Date object
    let date = new Date(response.data.time * 1000);

    // Set innerHTML of elements with weather data
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = `${Math.round(
      response.data.temperature.current
    )}°C`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  }

  // Function to format the date
  function formatDate(date) {
    let minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
  }

  // Function to fetch weather data based on city
  function searchCity(city) {
    let apiKey = "d7bft2a2ecbd3c41d91cf26o4a04c0b3";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    // Make the API call with axios and call refreshWeather when it completes
    axios.get(apiUrl).then(refreshWeather);
  }

  // Function to handle search form submission
  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
  }

  // Function to display a simple forecast
  function displayforecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {
      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
            <strong>15°</strong>
            </div>
            <div class="weather-forecast-temperature">9°</div>
          </div>
        </div>
      `;
    });

    let forecastElement = document.querySelector("#forecast"); // Define the variable here
    forecastElement.innerHTML = forecastHtml; // Use forecastElement
  }

  // Add the event listener to the form
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

  // Call the search function initially with a default city
  searchCity("pretoria");
  displayforecast(); // Display initial forecast
});
