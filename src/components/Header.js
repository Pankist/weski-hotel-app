import React, { useState, useRef, useEffect } from 'react';
import skiResorts from '../skiResorts.json'; // Adjust the path if needed
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Header = ({ onSearch }) => {
    const [location, setLocation] = useState(skiResorts[3].name);
    const [people, setPeople] = useState(4);
    const [dates, setDateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        }
    ]);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    const handleSearch = () => {
        onSearch({ location, people, dates: dates[0] });
        setShowCalendar(false);
    };

    const handleDateSelection = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    // Adjust calendar position dynamically
    useEffect(() => {
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
                <img src="/logo.png" alt="Logo" style={{ width: '126px', height: '20px' }} />
                <div className="text-2xl font-bold">WE-SKI</div>
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
                <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded-lg">Search</button>
            </div>
        </header>
    );
};

export default Header;