import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelCard from './HotelCard';

const mockHotel = {
    HotelName: "Test Hotel",
    HotelDescriptiveContent: {
        Images: [
            { MainImage: "True", URL: "https://example.com/mainimage.jpg" },
            { URL: "https://example.com/otherimage.jpg" }
        ]
    },
    HotelInfo: {
        Rating: "5",
        Beds: "2",
        Position: {
            Latitude: "45.000",
            Longitude: "7.000",
            Distances: [
                { type: "ski_lift", distance: "100m" },
                { type: "city_center", distance: "200m" }
            ]
        }
    },
    PricesInfo: {
        AmountAfterTax: "500"
    }
};

describe('HotelCard Component', () => {
    test('renders hotel information correctly', () => {
        render(<HotelCard hotel={mockHotel} />);
        expect(screen.getByText("Test Hotel")).toBeInTheDocument();
        expect(screen.getByText(/500/)).toBeInTheDocument();
        expect(screen.getByText(/2 beds/)).toBeInTheDocument();
        expect(screen.getByText(/45.000, 7.000/)).toBeInTheDocument();
    });

    test('loads main image correctly', () => {
        render(<HotelCard hotel={mockHotel} />);
        const image = screen.getByRole('img', { name: /test hotel/i });
        expect(image).toHaveAttribute('src', 'https://example.com/mainimage.jpg');
    });

});