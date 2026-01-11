
import { WeatherData, GeocodingResult } from '../types';

export const fetchGeocoding = async (query: string): Promise<GeocodingResult[]> => {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
  const data = await response.json();
  if (!data.results) return [];
  return data.results.map((r: any) => ({
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
};

export const fetchWeather = async (lat: number, lon: number, locationName: string, country: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
  );
  const data = await response.json();

  return {
    current: {
      temp: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day === 1,
      time: data.current.time,
    },
    daily: {
      time: data.daily.time,
      tempMax: data.daily.temperature_2m_max,
      tempMin: data.daily.temperature_2m_min,
      weatherCode: data.daily.weather_code,
      precipitationProbability: data.daily.precipitation_probability_max,
    },
    hourly: {
      time: data.hourly.time.slice(0, 24),
      temp: data.hourly.temperature_2m.slice(0, 24),
      weatherCode: data.hourly.weather_code.slice(0, 24),
    },
    location: {
      name: locationName,
      country: country,
      lat,
      lon,
    },
  };
};

export const getCityNameFromCoords = async (lat: number, lon: number): Promise<{ name: string; country: string }> => {
  // Rough reverse geocoding using a free endpoint or fallback
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return {
      name: data.address.city || data.address.town || data.address.village || 'Unknown Location',
      country: data.address.country || '',
    };
  } catch {
    return { name: 'Current Location', country: '' };
  }
};
