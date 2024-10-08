import React, { useState } from 'react';
import skiResorts from './skiResorts.json';
import Header from './components/Header';
import HotelCard from './components/HotelCard';

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [searchSummary, setSearchSummary] = useState('');
    const [loading, setLoading] = useState(false);

    // Helper function to sort hotels by price in ascending order
    const sortByPriceAscending = (hotels) => {
        return hotels.sort((a, b) => parseFloat(a.PricesInfo.AmountAfterTax) - parseFloat(b.PricesInfo.AmountAfterTax));
    };

    const handleSearch = async (searchParams) => {
        setHotels([]);
        setSearchSummary('');
        setLoading(true);

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
        let { value, done } = await reader.read();
        let decoder = new TextDecoder('utf-8');
        let chunk = decoder.decode(value, {stream: true});
        let result = '';

        try {
            while (!done) {
                result += chunk;
                try {
                    let json = JSON.parse(result);
                    const newHotels = json.body.accommodations;
                    setHotels(prevHotels => sortByPriceAscending([...prevHotels, ...newHotels]));
                    result = ''; // Clear the buffer if JSON was parsed successfully
                } catch (err) {
                    // JSON.parse failed, waiting for more chunks
                }

                ({ value, done } = await reader.read());
                chunk = decoder.decode(value, {stream: true});
            }
            // Parse any remaining JSON data and apply sorting
            if (result) {
                let json = JSON.parse(result);
                const newHotels = json.body.accommodations;
                setHotels(prevHotels => sortByPriceAscending([...prevHotels, ...newHotels]));
            }
        } catch (err) {
            console.error('Failed to read or parse stream:', err);
        } finally {
            setLoading(false); // Reset loading state when done
        }

        if (hotels.length > 0) {
            setSearchSummary(`${hotels.length} ski trips options • ${searchParams.location} • ${new Date(searchParams.dates.startDate).toLocaleDateString()} - ${new Date(searchParams.dates.endDate).toLocaleDateString()} • ${searchParams.people} people`);
        } else {
            setSearchSummary('No results found');
        }
    };

    return (
        <div className="max-w-[1366px] mx-auto">
            <Header onSearch={handleSearch} />
            <p className="p-4 text-xl">{loading ? "Loading..." : searchSummary}</p>
            <div className="p-4 flex flex-col gap-4">
                {hotels.length > 0 ? hotels.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                )) : loading ? null : (
                    <p className="text-center text-gray-500">No results found</p>
                )}
            </div>
        </div>
    );
};

export default App;