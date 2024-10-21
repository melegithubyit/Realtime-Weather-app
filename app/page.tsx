'use client';

import React, { useState, useEffect } from 'react';
import { useFetchforCityMutation } from '@/redux/api/endpoints';
import HomeCard from '@/components/homecard';
import map from '@/public/map3.jpg';
import Image from 'next/image';

interface WeatherData {
  city: string;
  temperature: number;
  weather: { icon: string; description: string }[]; // Added 'icon' property
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

type CitiesType = {
  [key: string]: [number, number];
};

const cities: CitiesType = {
  "Addis Ababa, Ethiopia": [9.0319, 38.7469],
  "Nairobi, Kenya": [-1.286389, 36.817223],
  "Kampala, Uganda": [0.3136, 32.5811],
  "London, United Kingdom": [51.5074, -0.1278],
  "New York, United States": [40.7128, -74.0060],
  "Tokyo, Japan": [35.6895, 139.6917],
  "Beijing, China": [39.9042, 116.4074],
  "Moscow, Russia": [55.7558, 37.6176],
  "Paris, France": [48.8566, 2.3522],
  "Berlin, Germany": [52.5200, 13.4050],
  "Cairo, Egypt": [30.0330, 31.2336],
  "Lagos, Nigeria": [6.5244, 3.3792],
  "Cape Town, South Africa": [-33.9249, 18.4241],
  "Sydney, Australia": [-33.8688, 151.2093],
  "Rio de Janeiro, Brazil": [-22.9068, -43.1729],
};

const cityNames = Object.keys(cities);

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [fetchForCity] = useFetchforCityMutation();

  const getRandomCitiesWeather = async () => {
    const shuffledCities = [...cityNames].sort(() => 0.5 - Math.random()).slice(0, 5);
    const weatherPromises = shuffledCities.map(async (city) => {
      const [lat, lon] = cities[city];
      const response = await fetchForCity({ lat, lon }).unwrap();
      return { city, ...response };
    });

    const weatherResults = await Promise.all(weatherPromises);
    setWeatherData(weatherResults);
  };

  useEffect(() => {
    getRandomCitiesWeather();
  }, []);

  return (
    <div className="text-white space-y-3">
      <h1 className="font-bold text-3xl py-3 text-center">Weather Information</h1>
      <div className="grid grid-rows-12">
        <div className="row-span-8 flex justify-center">
          {weatherData.length === 0 ? (
            <p className="text-center">Loading weather data...</p>
          ) : (
            <div className="flex gap-3">
              {weatherData.map((data, index) => (
                <div key={index}>
                  <HomeCard data={data} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="row-span-4 h-[170px]">
          <div className="w-full md:w-[70%] mx-auto h-full">
            <Image src={map} alt="map" layout="responsive" objectFit="contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
