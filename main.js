const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
    const data = await res.json();
    if(data.cod !== 200) return alert("Ciudad no encontrada");
    
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-3';
    card.innerHTML = `
        <div class="weather-card">
            <span class="close-btn">X</span>
            <h3>${data.name}</h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <h1>${Math.round(data.main.temp)}°C</h1>
            <p>${data.weather[0].description}</p>
        </div>`;
    card.querySelector('.close-btn').onclick = () => card.remove();
    document.getElementById('weatherContainer').prepend(card);
};

document.getElementById('searchBtn').onclick = () => {
    const input = document.getElementById('cityInput');
    if(input.value) getWeather(input.value);
    input.value = '';
};