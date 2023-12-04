import React, { useState } from 'react';
import CoordinateInput from '../components/CoordinateInput';
import MapComponent from '../components/MapComponent';
import fetchGeoJSON from '../services/MapService';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

const MapController: React.FC = () => {
    const [geoJSONData, setGeoJSONData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

    const handleFetchData = async (lat: number, lon: number) => {
        try {
            const data = await fetchGeoJSON(lat, lon);
            setGeoJSONData(data);
        } catch (error) {
            console.error("Error fetching GeoJSON data:", error);
        }
    };

    return (
        <div data-testid="map-controller">
            <CoordinateInput onSubmit={handleFetchData} />
            <MapComponent data={geoJSONData} />
        </div>
    );
};

export default MapController;
