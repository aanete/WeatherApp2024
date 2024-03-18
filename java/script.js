function refreshWeather(response) {
	let currentTime = document.querySelector("#currentTime");
	let date = new Date(response.data.time * 1000);
	currentTime.innerHTML = formatDate(date);
	let currentTemperature = document.querySelector("#current-temperature");
	let temperature = Math.round(response.data.temperature.current);
	currentTemperature.innerHTML = temperature;
	let currentIcon = document.querySelector(".current-temp-icon");
	let icon = response.data.condition.icon;
	currentIcon.src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
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

	getForecast(response.data.city);
}

function formatDate(date) {
	let minutes = date.getMinutes().toString().padStart(2, "0");
	let hours = date.getHours().toString().padStart(2, "0");
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

	return `${day}, ${hours}:${minutes}, `;
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

function formatForecastDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[date.getDay() + 1];
}

function getForecast(city) {
	let apiKey = "3441af01a760at92eea7f055fc4o28b5";
	let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
	axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
	console.log(response.data);

	let forecastHTML = "";

	response.data.daily.forEach(function (day, index) {
		if (index < 5) {
			let forecastMaxTemp = Math.round(day.temperature.maximum);
			let forecastMinTemp = Math.round(day.temperature.minimum);

			forecastHTML =
				forecastHTML +
				`        
        <div class="forecast-one-block">
            <div class="forecast-day">${formatForecastDay(day.time)}</div>
            <div class="forecast-icon">
			    <img
			    src="${day.condition.icon_url}"
			    alt="forecast-icon"
			    width="50px"
			    />
		    </div>
		    <div class="forecast-degrees">
			    <span class="forecast-degrees-max">${forecastMaxTemp}°</span> /
			    <span class="forecast-degrees-min">${forecastMinTemp}°</span>
		    </div>
        </div>
`;
		}
	});
	let forecastElement = document.querySelector(".forecast");
	forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector(".enter-city");
searchForm.addEventListener("submit", handleSearch);

searchCity("Bergen");
