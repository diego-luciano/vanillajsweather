let countriesApiUrl = 'https://restcountries.eu/rest/v2/all';

let days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

let day = document.querySelector("#day").innerHTML = days[new Date().getDay() + 1];

let currentCountry = document.querySelector("#country");
let temperature = document.querySelector("#temperature");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let airPressure = document.querySelector("#air-pressure");
let longitude = document.querySelector("#longitude");
let latitude = document.querySelector("#latitude");

function getWeather(country) {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=6d50a32a7c5764f6b4ffe48a41c17b4f`;
    
    fetch(weatherApiUrl)
        .then(data => data.json())
        .then(data => {
            currentCountry.innerHTML = country;
            temperature.innerHTML = `${Math.floor(fToCelsius(data.main.temp))}°`;
            humidity.innerHTML = data.main.humidity;
            wind.innerHTML = `${data.wind.speed}`;
            airPressure.innerHTML = data.main.pressure;
            longitude.innerHTML = data.coord.lon;
            latitude.innerHTML = data.coord.lat;
            
        })
        .catch(err => console.log(`Error getting weather: ${err}`));
}

function fToCelsius(farenheit) {
    return (farenheit - 32) * 5 / 9;
}

function getCountry(cb) {
    fetch(countriesApiUrl)
    .then(data => data.json())
    .then(data => {
        let countryName = data[Math.floor(Math.random() * data.length)].name;
        cb(null, countryName);
    })
    .catch(err => (err, null));
}

function startRequest() {
    getCountry((err, name) => {
        if (err) { console.log(`Error getting country: ${err}`); }
        else { getWeather(name); }
    });
}

startRequest();

