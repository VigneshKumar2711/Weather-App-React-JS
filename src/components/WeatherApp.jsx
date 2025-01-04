import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [windDirection, setWindDirection] = useState('');
  const [bgColor, setBgColor] = useState('');

  const weatherColors = {
    Clear: 'from-blue-500 via-indigo-500 to-purple-500',
    Clouds: 'from-gray-400 via-gray-500 to-gray-600',
    Rain: 'from-blue-700 via-blue-800 to-gray-800',
    Snow: 'from-blue-200 via-white to-gray-200',
    Thunderstorm: 'from-yellow-400 via-orange-500 to-red-600',
    Drizzle: 'from-teal-400 via-teal-500 to-blue-600',
    Mist: 'from-gray-200 via-gray-300 to-gray-400',
    Default: 'from-indigo-500 via-purple-500 to-pink-500',
  };

  const handleCity = (evt) => {
    setCity(evt.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=17656eb8b65b10ced708f1c9777405ad`
      );
      const { main, weather, wind } = response.data;
      const weatherCondition = weather[0].main;

      setWeather(weatherCondition);
      setDesc(weather[0].description);
      setTemp((main.temp - 273.15).toFixed(2));
      setIcon(weather[0].icon);
      setWindSpeed(wind.speed); 
      setWindDirection(wind.deg); 

      const backgroundColor = weatherColors[weatherCondition] || weatherColors.Default;
      setBgColor(backgroundColor);
    } catch (error) {
      alert('Failed to fetch weather data. Please check the city name.');
      setWeather('N/A');
      setTemp('');
      setDesc('');
      setIcon('');
      setWindSpeed('');
      setWindDirection('');
      setBgColor(weatherColors.Default); 
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br ${bgColor} transition-all duration-700`}
    >
      <div className="bg-violet-500 bg-opacity-80 shadow-xl rounded-3xl p-8 w-full max-w-lg transform hover:scale-105 transition-all duration-500">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-6 animate-fade-in-down">
          🌤️ Weather App
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          <b>Enter your city to get the latest weather updates!</b>
        </p>
        <input
          type="text"
          value={city}
          onChange={handleCity}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 text-lg"
          placeholder="Enter your city name"
        />
        <button
          onClick={getWeather}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
        >
          Get Weather Report
        </button>
        <div className="mt-6 space-y-4 text-center">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto w-20 h-20 animate-bounce"
            />
          )}
          <h2 className="text-2xl font-semibold text-gray-700">
            <b>Weather:</b> {weather || 'N/A'}
          </h2>
          <h2 className="text-2xl font-semibold text-gray-700">
            <b>Temperature:</b> {temp ? `${temp} °C` : 'N/A'}
          </h2>
          <h2 className="text-2xl font-semibold text-gray-700">
            <b>Description:</b> {desc || 'N/A'}
          </h2>
          {/* Wind Speed and Direction */}
          <h2 className="text-2xl font-semibold text-gray-700">
            <b>Wind Speed:</b> {windSpeed ? `${windSpeed} m/s` : 'N/A'}
          </h2>
          <h2 className="text-2xl font-semibold text-gray-700">
            <b>Wind Direction:</b> {windDirection ? `${windDirection}°` : 'N/A'}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
