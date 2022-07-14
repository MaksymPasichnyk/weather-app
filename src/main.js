import getWeatherInfo from './getWeatherAPI.js';
import './styles/main.scss';

const city = document.querySelector('.weather-widget__city');

function showWeather() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((pos) => {
			const coords = pos.coords;
			const {latitude: lat, longitude: long} = coords;
			console.log(pos)

			getWeatherInfo(lat, long);
		});
	} 
}

function getLocationBySearch() {
	const searchFormElement = document.querySelector('.country-search');

	searchFormElement.addEventListener('submit', (ev) => {
		ev.preventDefault();
		const countryField = ev.target.querySelector('.country-search__field'); 
		getLocation(countryField.value);
	})
}

async function getLocation(location) {
	const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}
	&limit=5&appid=78e2749a921b9ad6a4c78b8a2e04355c`);
	const data = await response.json();

	const {lat, lon} = data[0];
	const loc = {
		city: data[0].name,
		country: data[0].country,
	}

	getWeatherInfo(lat, lon, loc);
}





getLocationBySearch();
showWeather();
