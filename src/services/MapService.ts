import axios from 'axios';
import osmtogeojson from 'osmtogeojson';

const fetchGeoJSON = async (lat: number, lon: number) => {
    // Define a small delta to create a bounding box
    const delta = 0.005;

    const minLat = lat - delta;
    const minLon = lon - delta;
    const maxLat = lat + delta;
    const maxLon = lon + delta;

    const response = await axios.get(`https://www.openstreetmap.org/api/0.6/map?bbox=${minLon},${minLat},${maxLon},${maxLat}`);
    return osmtogeojson(response.data);
};

export default fetchGeoJSON;