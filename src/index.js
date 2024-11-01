function refreshWeather(response) {
  // Select elements
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");

  // Convert Unix timestamp to Date object
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon")
    
  



  // Set innerHTML of elements with weather data
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="weather-app-icon"/>`;
}

function formatDate(date) {
  // Correctly use the parameter name 'date'
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "d7bft2a2ecbd3c41d91cf26o4a04c0b3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  // Make the API call with axios and call refreshWeather when it completes
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

// Add the event listener to the form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Call the search function initially with a default city
searchCity("pretoria");
