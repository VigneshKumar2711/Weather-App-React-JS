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
  const [bgColor, setBgColor] = useState('from-indigo-500 via-purple-500 to-pink-500');
  const [error, setError] = useState('');

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
    setError(''); // Clear error on type
  };

  const getWeather = async (evt) => {
    evt.preventDefault(); // Added: for form submit
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
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
      setError('');

      const backgroundColor = weatherColors[weatherCondition] || weatherColors.Default;
      setBgColor(backgroundColor);
    } catch (error) {
      setError('Failed to fetch weather data. Please check the city name.');
      setWeather('');
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
      <main className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg transform hover:scale-105 transition-all duration-500">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-6">
          🌤️ Weather App
        </h1>
        <p className="text-center text-gray-800 mb-8 text-lg font-semibold">
          Enter your city to get the latest weather updates!
        </p>
        
        <form onSubmit={getWeather}>
          <label htmlFor="city-input" className="block text-gray-900 font-bold mb-2 text-lg">
            City Name
          </label>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={handleCity}
            className="w-full border-2 border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-700 focus:outline-none mb-2 text-lg text-gray-900"
            placeholder="Enter your city name"
            aria-describedby={error ? "city-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          />
          {error && (
            <p id="city-error" className="text-red-700 font-semibold mb-4" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg shadow-lg hover:bg-blue-900 focus:ring-4 focus:ring-blue-400 transition-all duration-300 text-lg font-bold"
          >
            Get Weather Report
          </button>
        </form>

        {weather && (
          <section aria-live="polite" className="mt-6 space-y-4 text-left">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Weather in {city}
            </h2>
            {icon && (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={`Weather icon showing ${desc}`}
                className="mx-auto w-20 h-20"
              />
            )}
            <dl className="grid grid-cols-1 gap-3 text-lg">
              <div className="flex justify-between">
                <dt className="font-semibold text-gray-900">Condition:</dt>
                <dd className="text-gray-900">{weather}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-gray-900">Temperature:</dt>
                <dd className="text-gray-900">{temp} °C</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-gray-900">Description:</dt>
                <dd className="text-gray-900 capitalize">{desc}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-gray-900">Wind Speed:</dt>
                <dd className="text-gray-900">{windSpeed} m/s</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-gray-900">Wind Direction:</dt>
                <dd className="text-gray-900">{windDirection}°</dd>
              </div>
            </dl>
          </section>
        )}
      </main>
    </div>
  );
}

export default WeatherApp;
