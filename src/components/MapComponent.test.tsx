import React from 'react';
import { render, screen } from '@testing-library/react';
import MapComponent from './MapComponent';

describe('MapComponent', () => {
    it('displays JSON data when data is provided', () => {
        const testData = {
            type: "FeatureCollection",
            features: []
        };

        render(<MapComponent data={testData} />);
        // Add a null check for the element
        expect(screen.getByText((content, element) => element !== null && element.tagName.toLowerCase() === 'pre' && content.includes('FeatureCollection'))).toBeInTheDocument();
    });

    it('displays a default message when no data is provided', () => {
        render(<MapComponent data={null} />);
        expect(screen.getByText("No GeoJSON data to display")).toBeInTheDocument();
    });
});
