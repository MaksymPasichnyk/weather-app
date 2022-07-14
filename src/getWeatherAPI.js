async function getWeatherInfo(lat, long, loc) {
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=78e2749a921b9ad6a4c78b8a2e04355c`);
	const data = await response.json();
	const currentDate = new Date().toLocaleString(undefined, {
		dateStyle: 'full',
	})
	const currentTime = new Date().toLocaleTimeString().slice(0,-3);

	const city = document.querySelector('.weather-widget__city');
	const degree = document.querySelector('.weather-widget__degree');
	const type = document.querySelector('.weather-widget__weather-type');
	const weatherIcon = document.querySelector('.weather-widget__icon');
	const weatherDate = document.querySelector('.weather-widget__date');
	const weatherDetailsListElement = document.querySelector('.weather-details__list');
	const forecastListElement = document.querySelector('.weather-days__list');


	weatherDate.textContent = `${currentTime} - ${currentDate}`;
	city.textContent = loc?.city || data.name;
	degree.textContent = (data.main.temp - 273.15).toFixed(1);
	type.textContent = data.weather[0].main;
	weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	weatherDetailsListElement.innerHTML = `
		<li>
			<span>Cloudy</span>
			<span>${data.clouds.all}%</span>
		</li>
		<li>
			<span>Humidity</span>
			<span>${data.main.humidity}%</span>
		</li>
		<li>
			<span>Wind</span>
			<span>${(data.wind.speed).toFixed(0)} km/h</span>
		</li>
	`;
}

export default getWeatherInfo;