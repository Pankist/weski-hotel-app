import React from 'react';
import placeholder from '../placeholder.png'; // Ensure this path is correct for your project structure

const HotelCard = ({ hotel }) => {
    // Find the main image using the provided structure
    const mainImageUrl = hotel.HotelDescriptiveContent.Images.find(img => img.MainImage === "True")?.URL || hotel.HotelDescriptiveContent.Images[0]?.URL || placeholder;

    // Helper to render star ratings
    const renderStars = (rating) => {
        return Array.from({ length: rating }, (_, i) => '⭐').join('');
    };

    // Handle image load error
    const handleImageError = (e) => {
        e.target.src = placeholder;
        e.target.style.filter = 'grayscale(100%)';
        e.target.style.opacity = '0.2';
    };

    return (
        <div className="flex h-60 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div style={{ width: '380px', height: '100%' }}>
                <img 
                    src={mainImageUrl} 
                    alt={hotel.HotelName} 
                    onError={handleImageError}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div className="flex-1 p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{hotel.HotelName}</h3>
                    <div className="text-blue-600 font-bold text-lg">
                        £{hotel.PricesInfo.AmountAfterTax} <span className="text-sm text-gray-500">/per person</span>
                    </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                    {renderStars(parseInt(hotel.HotelInfo.Rating))} ({hotel.HotelInfo.Beds} beds)
                </div>
                <div className="text-sm text-gray-500">
                    {hotel.HotelInfo.Position.Latitude}, {hotel.HotelInfo.Position.Longitude}
                    <br />
                    Ski lift: {hotel.HotelInfo.Position.Distances.find(d => d.type === 'ski_lift')?.distance}
                    <br />
                    City center: {hotel.HotelInfo.Position.Distances.find(d => d.type === 'city_center')?.distance}
                </div>
            </div>
        </div>
    );
};

export default HotelCard;