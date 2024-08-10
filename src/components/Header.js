import React, { useState, useRef, useEffect } from 'react';
import skiResorts from '../skiResorts.json'; // Ensure the path is correct for your project structure
import logo from '../logo.png'; // Ensure this path is correct
import searchIcon from '../search.png'; // Ensure this path is correct
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Default styles for DateRangePicker
import 'react-date-range/dist/theme/default.css'; // Default theme for DateRangePicker

const Header = ({ onSearch }) => {
    const [location, setLocation] = useState(skiResorts[3].name); // Default location set to the 4th item in skiResorts
    const [people, setPeople] = useState(4); // Default number of people set to 4
    const [dates, setDateRange] = useState([
        {
          startDate: new Date(), // Starting today
          endDate: new Date(), // Ending today, adjustable via DateRangePicker
          key: 'selection',
        }
    ]);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    const handleSearch = () => {
        onSearch({ location, people, dates: dates[0] });
        setShowCalendar(false); // Close calendar popup after search
    };

    const handleDateSelection = (ranges) => {
        setDateRange([ranges.selection]); // Update date range based on user selection
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar); // Toggle visibility of calendar popup
    };

    useEffect(() => {
        // Adjust position of calendar popup based on its location in the viewport
        if (showCalendar && calendarRef.current) {
            const { top, right } = calendarRef.current.getBoundingClientRect();
            const shiftRight = right > window.innerWidth ? window.innerWidth - right : 0;
            const shiftTop = top < 0 ? -top : 0;
            calendarRef.current.style.transform = `translate(${shiftRight}px, ${shiftTop}px)`;
        }
    }, [showCalendar]);

    return (
        <header className="bg-white p-6 shadow flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img src={logo} alt="Logo" style={{ width: '126px', height: '20px' }} />
            </div>
            <div ref={calendarRef} className="flex space-x-4 items-center relative">
                <select value={location} onChange={(e) => setLocation(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2">
                    {skiResorts.map((resort) => (
                        <option key={resort.id} value={resort.name}>{resort.name}</option>
                    ))}
                </select>
                <input type="number" value={people} onChange={(e) => setPeople(e.target.value)}
                       className="border border-gray-300 rounded-lg p-2 w-24 text-center"
                       min="1" max="10" placeholder="People" />
                <input type="text" readOnly value={`${dates[0].startDate.toLocaleDateString()} - ${dates[0].endDate.toLocaleDateString()}`}
                       onClick={toggleCalendar} className="border border-gray-300 rounded-lg p-2 cursor-pointer"
                       placeholder="Select Date Range" />
                {showCalendar && (
                    <div className="absolute z-10 bg-white p-2 border border-gray-300 rounded-lg">
                        <DateRangePicker ranges={[dates[0]]} onChange={handleDateSelection} />
                        <button onClick={handleSearch} className="mt-2 text-white bg-blue-600 p-2 rounded-lg">
                            Confirm Dates
                        </button>
                    </div>
                )}
                <button onClick={handleSearch} style={{
                        width: '112px',
                        height: '44px',
                        borderRadius: '8px', // All corners rounded
                        opacity: '1' // Ensuring visibility
                    }} className="border border-blue-600 text-blue-600 bg-white p-2 rounded-lg flex items-center space-x-2">
                    <img src={searchIcon} alt="Search" className="w-4 h-4" />
                    <span>Search</span>
                </button>
            </div>
        </header>
    );
};

export default Header;