import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    return axios
    .get(`${baseUrl}api/all`)
    .then(response => response.data)
}

const getCountry = countryName => {
    return axios
    .get(`${baseUrl}api/name/${countryName}`)
    .then(response => response.data)
}

const getCoordinates = (city, api_key) => {
    return axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
    .then(response => response.data)
}

const getWeather = (lat, lon, api_key) => {
    return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=metric&appid=${api_key}`)
    .then(response => response.data)
}

export default { getAll, getCountry, getCoordinates, getWeather }