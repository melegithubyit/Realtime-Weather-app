'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CitySearchProps {
  onSelect: (lat: number, lon: number) => void;
}

const Cities = {
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

const CitySearch: React.FC<CitySearchProps> = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1); // Track highlighted suggestion index
  const router = useRouter(); // Next.js router for navigation
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const filteredCities = Object.keys(Cities).filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCities);
      setHighlightIndex(-1); // Reset highlight index when suggestions change
    } else {
      setSuggestions([]);
    }
  };

  // Handle keyboard navigation (up, down, enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightIndex(prevIndex => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        handleSuggestionClick(suggestions[highlightIndex] as keyof typeof Cities);
      }
    }
  };

  const handleSuggestionClick = (city: keyof typeof Cities) => {
    setInput(city);
    setSuggestions([]);
    const [lat, lon] = Cities[city];
    onSelect(lat, lon); 

    // Navigate to another page with lat/lon as query parameters
    router.push(`/city?lat=${lat}&lon=${lon}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-[#373a50] outline-none shadow-2xl text-white rounded p-2 w-full"
        placeholder="Search for a city..."
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-[#fff] border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto z-[1000]">
          {suggestions.map((city, index) => (
            <li
              key={city}
              onClick={() => handleSuggestionClick(city as keyof typeof Cities)}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${highlightIndex === index ? 'bg-gray-200' : ''}`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;