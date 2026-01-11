
import React, { useState, useEffect, useCallback } from 'react';
import SearchInput from './components/SearchInput';
import WeatherCard from './components/WeatherCard';
import ForecastChart from './components/ForecastChart';
import AiSummary from './components/AiSummary';
import { fetchWeather, getCityNameFromCoords } from './services/weatherService';
import { generateAiInsights } from './services/geminiService';
import { WeatherData, GeocodingResult, AiInsights } from './types';
import { DEFAULT_LOCATION, WEATHER_INTERPRETATION } from './constants';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [aiInsights, setAiInsights] = useState<AiInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = useCallback(async (lat: number, lon: number, name: string, country: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(lat, lon, name, country);
      setWeatherData(data);
      
      // Trigger AI insights independently
      setIsAiLoading(true);
      const insights = await generateAiInsights(data);
      setAiInsights(insights);
      setIsAiLoading(false);
    } catch (err) {
      console.error(err);
      setError('Unable to fetch weather data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLocationSelect = (loc: GeocodingResult) => {
    loadWeather(loc.latitude, loc.longitude, loc.name, loc.country);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const { name, country } = await getCityNameFromCoords(latitude, longitude);
          loadWeather(latitude, longitude, name, country);
        },
        () => {
          loadWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude, DEFAULT_LOCATION.name, DEFAULT_LOCATION.country);
        }
      );
    } else {
      loadWeather(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude, DEFAULT_LOCATION.name, DEFAULT_LOCATION.country);
    }
  };

  useEffect(() => {
    handleGeolocation();
  }, []);

  const weatherTheme = weatherData ? WEATHER_INTERPRETATION[weatherData.current.weatherCode] : null;

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-6xl mx-auto relative">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="py-8 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="text-white text-xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            AETHERIA
          </h1>
        </div>

        <SearchInput onLocationSelect={handleLocationSelect} />
        
        <button 
          onClick={handleGeolocation}
          className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 2v2m0 16v2m10-10h-2M4 10H2m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 17.95l1.414-1.414M6.05 6.05L4.636 7.464M12 17a5 5 0 100-10 5 5 0 000 10z" />
          </svg>
          Current Location
        </button>
      </header>

      <main>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-medium">Summoning weather spirits...</p>
          </div>
        ) : error ? (
          <div className="glass rounded-3xl p-12 text-center max-w-lg mx-auto">
            <p className="text-red-400 font-bold mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-full text-sm font-bold transition-all">Retry</button>
          </div>
        ) : weatherData && (
          <div className="animate-in fade-in duration-700">
            <WeatherCard data={weatherData} />
            
            <div className="grid lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-8 flex flex-col">
                <ForecastChart data={weatherData} />
                <AiSummary insights={aiInsights} loading={isAiLoading} />
              </div>
              
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="glass rounded-3xl p-6 flex-1">
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">7-Day Outlook</h3>
                  <div className="flex flex-col gap-4">
                    {weatherData.daily.time.slice(1).map((time, i) => {
                      const dayName = new Date(time).toLocaleDateString('en-US', { weekday: 'short' });
                      const dayCode = weatherData.daily.weatherCode[i + 1];
                      const dayInfo = WEATHER_INTERPRETATION[dayCode] || { label: '?', icon: '❓', color: 'text-white' };
                      return (
                        <div key={time} className="flex items-center justify-between group">
                          <span className="text-slate-200 font-bold w-12">{dayName}</span>
                          <div className="flex items-center gap-2 flex-1 justify-center">
                            <span className="text-lg">{dayInfo.icon}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-500 hidden md:block">{dayInfo.label}</span>
                          </div>
                          <div className="flex items-center gap-3 w-20 justify-end">
                            <span className="text-slate-100 font-bold">{Math.round(weatherData.daily.tempMax[i+1])}°</span>
                            <span className="text-slate-500 text-sm">{Math.round(weatherData.daily.tempMin[i+1])}°</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="glass rounded-3xl p-6 bg-gradient-to-br from-cyan-600/20 to-transparent border-cyan-500/20">
                   <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Precipitation</h3>
                   <div className="text-3xl font-bold mb-1">{weatherData.daily.precipitationProbability[0]}%</div>
                   <p className="text-slate-400 text-sm">Chance of rain today.</p>
                   <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${weatherData.daily.precipitationProbability[0]}%` }}></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-800 pt-10 text-center text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
        &copy; 2024 Aetheria Weather Hackathon Project &bull; Powered by Gemini 3 & Open-Meteo
      </footer>
    </div>
  );
};

export default App;
