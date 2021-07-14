import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styling/weather.scss';

const Weather = () => {
    const [weather, updateWeather] = useState(null)
    useEffect(() => {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
        updateWeather(res.data.weather[0].description)
      })
    }, [])

    const [weatherSoton, updateWeatherSoton] = useState(null)
    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Southampton&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
            updateWeatherSoton(res.data.weather[0].description)
        })
    }, [])

    let [fiveDayForecast, updateFiveDayForecast] = useState(null)
    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=London&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
            let i = 0;
            const fiveDayForecastDummy = [];
            for (const desc of res.data.list) {
                if(i % 8 === 0) {
                    //console.log(desc.weather[0].description)
                    fiveDayForecastDummy.push(desc.weather[0].description)
                }
                i++;
            }
            //console.log(fiveDayForecastDummy)
            updateFiveDayForecast(fiveDayForecastDummy)
        })
    }, [])
    //console.log(fiveDayForecast)
    if(fiveDayForecast===null) {
        fiveDayForecast = ["", "","","",""]
        //code below for displaying the forecast is run before the values are retrieved
        //this code is needed to provide dummy values so that the code doesn't throw an index out of bounds error
    }

    const [searchedCity, updateSearchedCity] = useState('')
    const [searchedCityWeather, updateSearchedCityWeather] = useState(null)
    useEffect(() => {
        if(searchedCity !== '') {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
            updateSearchedCityWeather(res.data.weather[0].description)
        })}
    }, [searchedCity])
    return (
        <div data-testid="weather" className="weather">
            <input type="text" value={searchedCity} onChange={(e) => updateSearchedCity(e.target.value)} />
            <br />
            Weather:
            <br />
            The current weather in London is: {weather}
            <br />
            The current weather in Southampton is: {weatherSoton}
            <br />
            The 5 day forecast for London is:
            <br />
            {fiveDayForecast[0]}, {fiveDayForecast[1]}, {fiveDayForecast[2]}, {fiveDayForecast[3]}, {fiveDayForecast[4]}
            <br />
            Weather in {searchedCity}: {searchedCityWeather}
        </div>
    );
}

export default Weather;
