
import React from 'react';
import { WeatherData } from '../types';
import { WEATHER_INTERPRETATION } from '../constants';

interface Props {
  data: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ data }) => {
  const info = WEATHER_INTERPRETATION[data.current.weatherCode] || { label: 'Unknown', icon: '❓', color: 'text-white' };

  return (
    <div className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:scale-[1.01] duration-300">
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-6xl font-bold tracking-tight mb-2">
          {Math.round(data.current.temp)}°<span className="text-3xl text-slate-400">C</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{info.icon}</span>
          <span className={`text-xl font-medium ${info.color}`}>{info.label}</span>
        </div>
        <p className="text-slate-400 mt-4 font-medium uppercase tracking-widest text-xs">
          {data.location.name}, {data.location.country}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
        <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[120px]">
          <span className="text-slate-400 text-sm mb-1 font-semibold">Humidity</span>
          <span className="text-xl font-bold">{data.current.humidity}%</span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[120px]">
          <span className="text-slate-400 text-sm mb-1 font-semibold">Wind</span>
          <span className="text-xl font-bold">{Math.round(data.current.windSpeed)} <span className="text-xs">km/h</span></span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[120px]">
          <span className="text-slate-400 text-sm mb-1 font-semibold">Max Temp</span>
          <span className="text-xl font-bold text-orange-400">{Math.round(data.daily.tempMax[0])}°</span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[120px]">
          <span className="text-slate-400 text-sm mb-1 font-semibold">Min Temp</span>
          <span className="text-xl font-bold text-blue-400">{Math.round(data.daily.tempMin[0])}°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
