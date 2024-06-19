const apiKey = '1768dc16dcf938e8c3d860f5709610d8';
const form = document.getElementById('city-form');
const input = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');



let cities = [];
let weatherData = {};

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message);
    }
}

function displayWeather(data, city) {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card'); // css ko part
    weatherCard.innerHTML = `
        <div>
            <h2>${city}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
        </div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
    `;
    weatherDisplay.appendChild(weatherCard); // weatherCard ko value weatherDisplay sanga merge hune 
}

async function updateWeather() {
    weatherDisplay.innerHTML = '';
    for (const city of cities) {
        const data = await fetchWeather(city);
        if (data) {
            weatherData[city] = data;
            displayWeather(data, city);
        }
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city && !cities.includes(city)) {
        cities.push(city);
        const data = await fetchWeather(city);
        if (data) {
            weatherData[city] = data;
            displayWeather(data, city);
        }
    }
    input.value = '';
});

setInterval(updateWeather, 10 * 60 * 1000); // Update every 10 minutes
