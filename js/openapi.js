"use strict";
// https://api.open-meteo.com/v1/forecast?latitude=32.2217&longitude=-110.9265&daily=temperature_2m_max,weather_code,temperature_2m_min&timezone=auto&temperature_unit=fahrenheit
// https://api.open-meteo.com/v1/forecast?latitude=32.2217&longitude=-110.9265&current=temperature_2m,apparent_temperature&timezone=auto&temperature_unit=fahrenheit

const baseURL = "https://api.open-meteo.com/v1/forecast?";

const getWeekForecastBtn = document.querySelector(".week-forecast-btn");
const getCurrentForecastBtn = document.querySelector(".current-forecast-btn");
const weeklyForecast = document.querySelector(".weekly-forecast");
const weeklyForecastData = document.querySelector(".weekly-forecast-data");
const currentForecast = document.querySelector(".current-forecast");
const currentTemp = document.querySelector(".current-temp");
const currentApparentTemp = document.querySelector(".current-apparent-temp");

getWeekForecastBtn.addEventListener("click", displayWeekForecast);
getCurrentForecastBtn.addEventListener("click", displayCurrentForecast);

// Display Weekly Forecast Logic

async function getWeekForecast(latitude, longitude) {
  try {
    const response = await fetch(
      `${baseURL}latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=fahrenheit`,
    );
    return await response.json();
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}

function createWeeklyHTML(forecast) {
  weeklyForecastData.innerHTML =
    "<div class='weekly-forecast-label'><p class='high-temp'>High:</p><p class='low-temp'>Low:</p></div>";
  for (let i = 0; i < 7; i++) {
    const weeklyForecastItem = document.createElement("div");
    weeklyForecastItem.classList.add("weekly-forecast-item");
    weeklyForecastItem.innerHTML = `<p class='daily-temp-max'>${forecast.daily.temperature_2m_max[i]}°F</p><p class='daily-temp-min'>${forecast.daily.temperature_2m_min[i]}°F</p>`;
    weeklyForecastData.appendChild(weeklyForecastItem);
  }
}

function displayWeekForecast() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const forecast = await getWeekForecast(latitude, longitude);
      createWeeklyHTML(forecast);
      weeklyForecast.style.display = "flex";
      currentForecast.style.display = "none";
      getWeekForecastBtn.classList.add("api-btn-pressed");
      getCurrentForecastBtn.classList.remove("api-btn-pressed");
    });
  } else {
    console.error("Location services are unavailable.");
  }
}

// Display Current Forecast Logic

async function getCurrentForecast(latitude, longitude) {
  try {
    const response = await fetch(
      `${baseURL}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature&timezone=auto&temperature_unit=fahrenheit`,
    );
    return await response.json();
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}

function createCurrentHTML(forecast) {
  const temp = forecast.current.temperature_2m;
  const apparentTemp = forecast.current.apparent_temperature;
  currentTemp.textContent = `${temp}°F`;
  currentApparentTemp.textContent = `${apparentTemp}°F`;
}

function displayCurrentForecast() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const forecast = await getCurrentForecast(latitude, longitude);
      createCurrentHTML(forecast);
      currentForecast.style.display = "flex";
      weeklyForecast.style.display = "none";
      getCurrentForecastBtn.classList.add("api-btn-pressed");
      getWeekForecastBtn.classList.remove("api-btn-pressed");
    });
  } else {
    console.error("Location services are unavailable.");
  }
}
