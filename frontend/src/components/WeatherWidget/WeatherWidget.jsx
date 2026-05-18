import { useState, useEffect } from "react";
import styles from "./WeatherWidget.module.css";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Kremenchuk");
  const [loading, setLoading] = useState(true); // Одразу ставимо true, бо запит піде при старті
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (searchParam) => {
    try {
      setLoading(true);
      setError(null);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchParam}&units=metric&appid=${API_KEY}`;

      if (searchParam.lat && searchParam.lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${searchParam.lat}&lon=${searchParam.lon}&units=metric&appid=${API_KEY}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found or API error");
      const data = await response.json();

      setWeather(data);
      setCity(data.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Асинхронна функція всередині useEffect вирішує проблему з синхронним setState
    const initWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather({ lat: latitude, lon: longitude });
          },
          () => {
            // Якщо заборонили локацію
            fetchWeather(city);
          },
        );
      } else {
        fetchWeather(city);
      }
    };

    initWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city);
  };

  return (
    <section className={styles.widgetContainer}>
      <h3 className={styles.title}>Local Office Weather</h3>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          disabled={loading}
          className={styles.searchInput}
        />
        <button type="submit" disabled={loading} className={styles.searchBtn}>
          Search
        </button>
      </form>

      {loading && (
        <p className={`${styles.statusText} ${styles.loading}`}>
          Loading weather data...
        </p>
      )}
      {error && (
        <p className={`${styles.statusText} ${styles.error}`}>Error: {error}</p>
      )}

      {weather && !loading && !error && (
        <div className={styles.weatherInfo}>
          <h4 className={styles.cityName}>
            {weather.name}, {weather.sys.country}
          </h4>
          <p className={styles.temperature}>
            {Math.round(weather.main.temp)}°C
          </p>
          <p className={styles.description}>{weather.weather[0].description}</p>
          <div className={styles.details}>
            <span>Humidity: {weather.main.humidity}%</span>
            <span>Wind: {weather.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </section>
  );
}
