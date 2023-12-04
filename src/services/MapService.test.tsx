import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import fetchGeoJSON from './MapService';

jest.mock('axios');
jest.mock('osmtogeojson');

describe('fetchGeoJSON', () => {
    it('fetches data and converts it to GeoJSON', async () => {
        const mockAxiosResponse = {
            data: { /* mocked OSM data */ }
        };
        const mockGeoJSON = { type: 'FeatureCollection', features: [] };

        (axios.get as jest.Mock).mockResolvedValue(mockAxiosResponse);
        (osmtogeojson as jest.Mock).mockReturnValue(mockGeoJSON);

        const lat = 52.5200;
        const lon = 13.4050;
        const delta = 0.005;

        const result = await fetchGeoJSON(lat, lon);

        expect(axios.get).toHaveBeenCalledWith(`https://www.openstreetmap.org/api/0.6/map?bbox=${lon - delta},${lat - delta},${lon + delta},${lat + delta}`);
        expect(osmtogeojson).toHaveBeenCalledWith(mockAxiosResponse.data);
        expect(result).toBe(mockGeoJSON);
    });
});
