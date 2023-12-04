import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin: 20px;
`;

const CoordinateInput: React.FC<{ onSubmit: (lat: number, lon: number) => void }> = ({ onSubmit }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        if (!isNaN(lat) && !isNaN(lon)) {
            onSubmit(lat, lon);
        }
    };

    return (
        <InputContainer>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}
                    placeholder="Latitude"
                />
                <input
                    type="text"
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                    placeholder="Longitude"
                />
                <button type="submit">Fetch GeoJSON</button>
            </form>
        </InputContainer>
    );
};

export default CoordinateInput;
