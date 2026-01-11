
export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
    isDay: boolean;
    time: string;
  };
  daily: {
    time: string[];
    tempMax: number[];
    tempMin: number[];
    weatherCode: number[];
    precipitationProbability: number[];
  };
  hourly: {
    time: string[];
    temp: number[];
    weatherCode: number[];
  };
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

export interface GeocodingResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface AiInsights {
  summary: string;
  outfitAdvice: string;
  activities: string[];
  alert?: string;
}
