import React from 'react';

interface WeatherData {
    city: string;
    weather: { icon: string; description: string }[];
    main: { temp: number; humidity: number };
}

const HomeCard: React.FC<{ data: WeatherData }> = ({ data }) => {
    const backgroundImageStyle = {
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBvmvfQGnZOPZ0s2dgGwYzFN_JxvNGCdwcxQ&s')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    // Split city and country by comma
    const cityName = data.city.split(',')[0]; // Take only the city part

    return (
        <div className="relative w-[130px] h-[310px] rounded-xl overflow-hidden shadow-md hover:scale-105">
            {/* Background image with opacity */}
            <div style={backgroundImageStyle} className="absolute inset-0 opacity-70"></div>

            {/* Content of the card */}
            <div className="relative z-10 flex flex-col justify-between items-center p-4 bg-[#373a50] bg-opacity-70 h-full rounded-xl">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl text-center font-bold text-white">{cityName}</h1> {/* Display only the city name */}
                    <img src={icon} alt="weather icon" />
                    <p className="text-center text-white">{data.weather[0].description}</p>
                </div>
                <div className="">
                    <p className="font-bold text-3xl text-white">{Math.round(data.main.temp - 273.15)}°C</p>
                    <p className="text-sm text-white">{data.main.humidity}% Humid</p>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
