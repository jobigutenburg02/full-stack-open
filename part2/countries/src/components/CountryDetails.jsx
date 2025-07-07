import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const CountryDetails = ({country}) => {
    
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const capital = country.capital[0]
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
        .then(response => {
            setWeather(response.data)
        })
        .catch(error => {
          console.error('Error fetching weather:', error)
        })
    }, [country, api_key])

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages)
        .map((lang, index) => (
            <li key={index}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
      <h2>Weather in {country.capital[0]}</h2>

      {weather ? (
        <div>
            <p>Temperature: {weather.main.temp}°C</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt="Weather icon" 
            />
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Weather data is not available</p>
      )}
    </>
  )
}

export default CountryDetails