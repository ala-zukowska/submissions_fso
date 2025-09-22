const DisplayWeather = ({ weather }) => {
    if (!weather) {
        return null
    }
    return (<div>
        <h2>Weather in {weather.name}</h2>
        <p>Temperature: {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Weather icon: ${weather.weather[0].main} - ${weather.weather[0].description}`}></img>
        <p>Wind: {weather.wind.speed} m/s</p>
    </div>)
}

export default DisplayWeather