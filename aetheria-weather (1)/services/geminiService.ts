
import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData, AiInsights } from "../types";

export const generateAiInsights = async (weather: WeatherData): Promise<AiInsights> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the following weather data for ${weather.location.name}, ${weather.location.country}:
    - Current Temperature: ${weather.current.temp}°C
    - Weather Condition Code: ${weather.current.weatherCode}
    - Humidity: ${weather.current.humidity}%
    - Wind Speed: ${weather.current.windSpeed} km/h
    - Weekly Outlook: Max ${Math.max(...weather.daily.tempMax)}°C, Min ${Math.min(...weather.daily.tempMin)}°C
    
    Provide a concise summary, specific clothing advice, 3-4 recommended activities, and a brief alert if any extreme conditions are present.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: 'A short friendly summary of the current weather.' },
          outfitAdvice: { type: Type.STRING, description: 'Specific clothing recommendations for this weather.' },
          activities: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'A list of 3-4 suitable activities for the day.' 
          },
          alert: { type: Type.STRING, description: 'Any weather warnings or precautions (optional).' }
        },
        required: ["summary", "outfitAdvice", "activities"],
      },
    },
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (err) {
    console.error("Failed to parse AI response", err);
    return {
      summary: "Enjoy the day at your own pace.",
      outfitAdvice: "Check the temperature before heading out.",
      activities: ["Outdoor walk", "Visit a cafe", "Read a book"],
    };
  }
};
