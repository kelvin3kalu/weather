const apiKey = 'e8b2b270dc8c3811f59481d89a2f22b3';
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDataDiv = document.getElementById('weather-data');

getWeatherBtn.addEventListener('click', getWeatherData);

function getWeatherData() {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }

            const tempC = data.main.temp;
            const backgroundvideo = document.getElementById('background-video');
            // Determine temperature class
            let tempClass = '';
            if (tempC <= 10) {
                tempClass = 'temp-cold';
                backgroundvideo.src = "191159-889246512.mp4";
                
            } else if (tempC <= 25) {
                tempClass = 'temp-warm';
                backgroundvideo.src = "videos/warm.mp4";
            } else {
                tempClass = 'temp-hot';
                backgroundvideo.src = "videos/hot.mp4";
            }

            const weatherData = `
            <div class="${tempClass}">
                <h3>Weather in ${data.name}</h3>
                <p class="${tempClass}">Temperature: ${tempC} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
            `;

            weatherDataDiv.innerHTML = weatherData;
            weatherDataDiv.classList.remove('show');
            void weatherDataDiv.offsetWidth; // Trigger reflow
            weatherDataDiv.classList.add('show');
        })
        .catch(error => {
            console.error(error);
            alert('Failed to fetch weather data.');
        });
}
