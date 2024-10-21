'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFetchforCityMutation } from '@/redux/api/endpoints';
import Link from 'next/link';

interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number; feels_like: number, temp_min: number; temp_max: number; pressure:number };
  visibility: number;
  wind: {speed: number};
  sys: {sunrise: number; sunset:number};
}

const CityInfoPageContent = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const [fetchForCity] = useFetchforCityMutation();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchForCity({ lat, lon }).unwrap();
      setData(response);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchWeatherData(Number(lat), Number(lon));
    }
  }, [lat, lon]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading city weather data...</div>;
  }

  if (error) {
    return <div className="text-white text-center mt-10">{error}</div>;
  }

  if (!data) {
    return null;
  }

  const weatherIcon = data?.weather[0].icon;
  const icon = `http://openweathermap.org/img/w/${weatherIcon}.png`;

  const name = data?.name;
  const description = data?.weather[0].description;
  const temp = Math.round(data?.main.temp - 273.15);
  const feelslike = Math.round(data?.main.feels_like - 273.15);
  const humidity = data?.main.humidity;
  const pressure = data?.main.pressure;
  const visibility = data?.visibility;
  const wind = data?.wind.speed;
  const sunrise = data?.sys.sunrise;
  const sunset = data?.sys.sunset;
  const mintemp = Math.round(data?.main.temp_min - 273.15);
  const maxtemp = Math.round(data?.main.temp_max - 273.15);

  return (
    <div className='py-4'>
      <Link href={'/'} className="text-[#ff8c56] bg-[#373a50] py-1 px-3 rounded mt-[20px]">Home</Link>
      <div className="text-white">
        <div className="flex justify-between items-center py-10 w-[70%] mx-auto">
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="text-4xl font-bold text-[#ff8c56]">{name}</h1>
            <p className="text-xl">{description}</p>
            <span className='flex items-end gap-3'>
              <p className='font-bold text-5xl'>{temp}°C</p>
              <p>feels like: {feelslike} °C</p>
            </span>
          </div>
          <img src={icon} alt="weather icon" className='w-[120px] h-[120px]' />
        </div>
        <div className="">
          <div className="grid grid-cols-2 w-[70%] mx-auto gap-4">
            <div className="bg-[#373a50] p-3 rounded-lg">
              <h1 className="text-xl font-bold text-[#ff8c56]">Details</h1>
              <div className="flex justify-between py-1">
                <p>Humidity</p>
                <p>{humidity}%</p>
              </div>
              <div className="flex justify-between py-1">
                <p>Pressure</p>
                <p>{pressure} hPa</p>
              </div>
              <div className="flex justify-between py-1">
                <p>Visibility</p>
                <p>{visibility} m</p>
              </div>
              <div className="flex justify-between py-1">
                <p>Wind</p>
                <p>{wind} m/s</p>
              </div>
            </div>
            <div className="bg-[#373a50] p-3 rounded-lg">
              <h1 className="text-xl font-bold text-[#ff8c56]">Sunrise & Sunset</h1>
              <div className="flex justify-between py-1">
                <p>Sunrise</p>
                <p>{new Date(sunrise * 1000).toLocaleTimeString()}</p>
              </div>
              <div className="flex justify-between py-1">
                <p>Sunset</p>
                <p>{new Date(sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="w-[70%] mx-auto bg-[#373a50] p-3 rounded-lg mt-4">
            <h1 className="text-xl font-bold text-[#ff8c56]">Temperature</h1>
            <div className="flex justify-between py-1">
              <p>Min Temp</p>
              <p>{mintemp}°C</p>
            </div>
            <div className="flex justify-between py-1">
              <p>Max Temp</p>
              <p>{maxtemp}°C</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CityInfoPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityInfoPageContent />
    </Suspense>
  );
};

export default CityInfoPage;
