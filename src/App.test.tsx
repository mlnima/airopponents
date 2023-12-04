import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app with a header and the MapController component', () => {
    render(<App />);
    expect(screen.getByText(/geojson map viewer/i)).toBeInTheDocument();
    expect(screen.getByTestId('map-controller')).toBeInTheDocument();
  });
});
