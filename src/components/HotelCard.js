import React from 'react';

const HotelCard = ({ hotel }) => {
    // Find the main image URL
    const mainImageUrl = hotel.HotelDescriptiveContent.Images.find(img => img.MainImage === "True")?.URL || hotel.HotelDescriptiveContent.Images[0]?.URL || '/placeholder.jpg';

    return (
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 w-full bg-gray-200">
                <img 
                    src={mainImageUrl}
                    alt={hotel.HotelName}
                    className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{hotel.HotelName}</h3>
                    <div className="text-blue-600 font-bold text-lg">
                        £{hotel.PricesInfo.AmountAfterTax} <span className="text-sm text-gray-500">/per person</span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <span>{hotel.HotelInfo.Position.Latitude}, {hotel.HotelInfo.Position.Longitude}</span>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;

