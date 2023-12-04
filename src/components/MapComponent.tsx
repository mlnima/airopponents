import React from 'react';
import styled from 'styled-components';

const MapContainer = styled.pre`
  text-align: left;
  margin: 20px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const MapComponent: React.FC<{ data: any }> = ({ data }) => {
    return (
        <MapContainer data-testid="json-output">
            {data ? JSON.stringify(data, null, 2) : 'No GeoJSON data to display'}
        </MapContainer>
    );
};


export default MapComponent;