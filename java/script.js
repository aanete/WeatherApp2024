function formatDate(now) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let day = days[now.getDay()];
	let hours = now.getHours().toString().padStart(2, "0");
	let minutes = now.getMinutes().toString().padStart(2, "0");
	return `${day}, ${hours}:${minutes}, `;
}
let currentTime = document.querySelector("#currentTime");
let now = new Date();
currentTime.innerHTML = formatDate(now);

function refreshWeather(response) {
	console.log(response.data);
	let currentTemperature = document.querySelector("#current-temperature");
	let temperature = Math.round(response.data.temperature.current);
	currentTemperature.innerHTML = temperature;
	//let currentIcon = document.querySelector(".current-temp-icon");
	//let icon = response.data.condition.icon;
	//currentIcon.innerHTML = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
	let currentCity = document.querySelector(".current-city");
	currentCity.innerHTML = response.data.city;
	let currentClouds = document.querySelector("#clouds");
	currentCloudsEnd = response.data.condition.description;
	currentClouds.innerHTML =
		currentCloudsEnd.charAt(0).toUpperCase() + currentCloudsEnd.slice(1);
	let currentHumidity = document.querySelector("#humidity");
	currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
	let currentWind = document.querySelector("#wind");
	currentWind.innerHTML = `${response.data.wind.speed} m/s`;
}

function searchCity(city) {
	let apiKey = "3441af01a760at92eea7f055fc4o28b5";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

	axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#cityName");

	searchCity(searchInput.value);
}

let searchForm = document.querySelector(".enter-city");
searchForm.addEventListener("submit", handleSearch);

searchCity("Bergen");
