import React, { useState } from 'react';
import skiResorts from '../skiResorts.json'; // Adjust the path if needed

const Header = ({ onSearch }) => {
    const [location, setLocation] = useState(skiResorts[3].name); // Default to 'La Plagne'
    const [people, setPeople] = useState(4);
    const [dates, setDates] = useState({ from: '2024-12-01', to: '2024-12-12' });

    const handleSearch = () => {
        onSearch({ location, people, dates });
    };

    return (
        <header className="bg-white p-6 shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img src="/logo.png" alt="Logo" className="h-10" />
                <div className="text-2xl font-bold">WE-SKI</div>
            </div>
            <div className="flex space-x-4 items-center">
                <select 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2">
                    {skiResorts.map((resort) => (
                        <option key={resort.id} value={resort.name}>
                            {resort.name}
                        </option>
                    ))}
                </select>
                <input 
                    type="number" 
                    value={people} 
                    onChange={(e) => setPeople(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-24 text-center" 
                    min="1" 
                    max="10"
                    placeholder="People" />
                <input 
                    type="date" 
                    value={dates.from} 
                    onChange={(e) => setDates({ ...dates, from: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2" />
                <input 
                    type="date" 
                    value={dates.to} 
                    onChange={(e) => setDates({ ...dates, to: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2" />
                <button 
                    onClick={handleSearch}
                    className="bg-blue-600 text-white p-2 rounded-lg">
                    Search
                </button>
            </div>
        </header>
    );
};

export default Header;
