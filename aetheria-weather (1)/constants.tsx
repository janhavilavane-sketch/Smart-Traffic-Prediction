
import React from 'react';

export const WEATHER_INTERPRETATION: Record<number, { label: string; icon: string; color: string }> = {
  0: { label: 'Clear Sky', icon: '☀️', color: 'text-yellow-400' },
  1: { label: 'Mainly Clear', icon: '🌤️', color: 'text-yellow-200' },
  2: { label: 'Partly Cloudy', icon: '⛅', color: 'text-gray-300' },
  3: { label: 'Overcast', icon: '☁️', color: 'text-gray-400' },
  45: { label: 'Foggy', icon: '🌫️', color: 'text-blue-200' },
  48: { label: 'Depositing Rime Fog', icon: '🌫️', color: 'text-blue-100' },
  51: { label: 'Light Drizzle', icon: '🌦️', color: 'text-blue-300' },
  53: { label: 'Moderate Drizzle', icon: '🌦️', color: 'text-blue-400' },
  55: { label: 'Dense Drizzle', icon: '🌦️', color: 'text-blue-500' },
  61: { label: 'Slight Rain', icon: '🌧️', color: 'text-blue-400' },
  63: { label: 'Moderate Rain', icon: '🌧️', color: 'text-blue-500' },
  65: { label: 'Heavy Rain', icon: '🌧️', color: 'text-blue-700' },
  71: { label: 'Slight Snowfall', icon: '❄️', color: 'text-white' },
  73: { label: 'Moderate Snowfall', icon: '❄️', color: 'text-white' },
  75: { label: 'Heavy Snowfall', icon: '❄️', color: 'text-white' },
  80: { label: 'Slight Rain Showers', icon: '🌦️', color: 'text-blue-400' },
  81: { label: 'Moderate Rain Showers', icon: '🌦️', color: 'text-blue-500' },
  82: { label: 'Violent Rain Showers', icon: '🌧️', color: 'text-blue-600' },
  95: { label: 'Thunderstorm', icon: '⛈️', color: 'text-purple-400' },
  96: { label: 'Thunderstorm with Hail', icon: '⛈️', color: 'text-purple-500' },
  99: { label: 'Heavy Thunderstorm with Hail', icon: '⛈️', color: 'text-purple-700' },
};

export const DEFAULT_LOCATION = {
  name: 'San Francisco',
  country: 'USA',
  latitude: 37.7749,
  longitude: -122.4194
};
