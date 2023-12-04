import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CoordinateInput from './CoordinateInput';

describe('CoordinateInput', () => {
    it('renders two input fields and a button', () => {
        render(<CoordinateInput onSubmit={() => {}} />);
        expect(screen.getByPlaceholderText(/latitude/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/longitude/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /fetch geojson/i })).toBeInTheDocument();
    });

    it('updates input fields on user input', () => {
        render(<CoordinateInput onSubmit={() => {}} />);
        const latitudeInput = screen.getByPlaceholderText(/latitude/i) as HTMLInputElement;
        const longitudeInput = screen.getByPlaceholderText(/longitude/i) as HTMLInputElement;

        fireEvent.change(latitudeInput, { target: { value: '52.5200' } });
        fireEvent.change(longitudeInput, { target: { value: '13.4050' } });

        expect(latitudeInput.value).toBe('52.5200');
        expect(longitudeInput.value).toBe('13.4050');
    });

    it('calls onSubmit with latitude and longitude when form is submitted', () => {
        const mockOnSubmit = jest.fn();
        render(<CoordinateInput onSubmit={mockOnSubmit} />);
        const latitudeInput = screen.getByPlaceholderText(/latitude/i);
        const longitudeInput = screen.getByPlaceholderText(/longitude/i);

        fireEvent.change(latitudeInput, { target: { value: '52.5200' } });
        fireEvent.change(longitudeInput, { target: { value: '13.4050' } });
        fireEvent.click(screen.getByRole('button', { name: /fetch geojson/i }));

        expect(mockOnSubmit).toHaveBeenCalledWith(52.5200, 13.4050);
    });
});
