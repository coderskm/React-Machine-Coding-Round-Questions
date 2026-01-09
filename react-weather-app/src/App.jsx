import { useState } from "react";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_KEY
        }`
      );
      if (!response.ok) {
        setError({ status: false, message: ` City Not Found !!! ${response.status} status code` });
      }
      let cityData = await response.json();
      setWeatherData(cityData);
    } catch (error) {
      setError({ status: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="weather-container">
        <h1>REACT WEATHER APP</h1>
        <input
          type="text"
          placeholder="Enter City Name ..."
          value={cityName}
          onChange={(event) => setCityName(event.target.value)}
        />
        <button onClick={fetchWeatherData}>Click</button>
      </div>
      {loading && <p className="loading-state">LOADING ...</p>}
      {error && <p className="error-state">{error.message}</p>}

      {weatherData && !loading && !error && (
        <div className="weather-detail-container">
          <p>
            Weather details of <span>{weatherData.name}</span> on{" "}
            <span>{new Date(weatherData.dt * 1000).toLocaleString()}</span> :-
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <p>
            actual temperature is <span> {weatherData.main["temp"]}°C </span>
          </p>
          <p>
            but feels like <span> {weatherData.main["feels_like"]}°C</span>
          </p>
          <p>
            wind speed is <span> {weatherData.wind["speed"]} m/s</span>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
