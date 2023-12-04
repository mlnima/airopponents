import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MapController from './MapController';
import fetchGeoJSON from '../services/MapService';
jest.mock('../services/MapService'); // Mocking the MapService

describe('MapController', () => {
    beforeEach(() => {
        (fetchGeoJSON as jest.Mock).mockClear();
    });

    it('fetches GeoJSON data and passes it to MapComponent on form submission', async () => {
        const mockData = {
            type: "FeatureCollection",
            features: []
        };
        (fetchGeoJSON as jest.Mock).mockResolvedValue(mockData);

        render(<MapController />);
        fireEvent.change(screen.getByPlaceholderText(/latitude/i), { target: { value: '52.5200' } });
        fireEvent.change(screen.getByPlaceholderText(/longitude/i), { target: { value: '13.4050' } });
        fireEvent.click(screen.getByRole('button', { name: /fetch geojson/i }));

        await waitFor(() => {
            expect(fetchGeoJSON).toHaveBeenCalledWith(52.5200, 13.4050);
            const jsonOutputElement = screen.getByTestId('json-output');
            expect(jsonOutputElement.textContent).toBe(JSON.stringify(mockData, null, 2));
        });
    });

    it('displays a message when no data is available', async () => {
        (fetchGeoJSON as jest.Mock).mockResolvedValue(null);

        render(<MapController />);
        fireEvent.change(screen.getByPlaceholderText(/latitude/i), { target: { value: '52.5200' } });
        fireEvent.change(screen.getByPlaceholderText(/longitude/i), { target: { value: '13.4050' } });
        fireEvent.click(screen.getByRole('button', { name: /fetch geojson/i }));

        await waitFor(() => {
            expect(fetchGeoJSON).toHaveBeenCalledWith(52.5200, 13.4050);
            expect(screen.getByText("No GeoJSON data to display")).toBeInTheDocument();
        });
    });
});
