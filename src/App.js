import React, { useState } from 'react';
import skiResorts from './skiResorts.json';
import Header from './components/Header';
import HotelCard from './components/HotelCard';

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [searchSummary, setSearchSummary] = useState(''); // For displaying search summary

    const handleSearch = async (searchParams) => {
        const skiSite = skiResorts.find(resort => resort.name === searchParams.location).id;
        const requestBody = {
            query: {
                ski_site: skiSite,
                from_date: searchParams.dates.startDate.toISOString().slice(0, 10),
                to_date: searchParams.dates.endDate.toISOString().slice(0, 10),
                group_size: searchParams.people,
            }
        };
    
        const response = await fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
    
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = '';
        let done = false;
    
        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = streamDone;
            result += decoder.decode(value);
        }
    
        const data = JSON.parse(result);
        if (data.body && data.body.accommodations) {
            setHotels(data.body.accommodations);
            setSearchSummary(`${data.body.accommodations.length} ski trips options • ${searchParams.location} • ${new Date(searchParams.dates.startDate).toLocaleDateString()} - ${new Date(searchParams.dates.endDate).toLocaleDateString()} • ${searchParams.people} people`);
        } else {
            setHotels([]);
            setSearchSummary('No results found');
        }
    };    

    return (
        <div>
            <Header onSearch={handleSearch} />
            <p className="p-4 text-xl">{searchSummary}</p>
            <div className="p-4 flex flex-col gap-4">
                {hotels.length > 0 ? hotels.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                )) : (
                    <p className="text-center text-gray-500">No results found</p>
                )}
            </div>
        </div>
    );
};

export default App;