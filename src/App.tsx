import React from 'react';
import MapController from './components/MapController';
import styled from 'styled-components';
const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
      <AppContainer>
        <header>
          <h1>GeoJSON Map Viewer</h1>
        </header>
        <MapController />
      </AppContainer>
  );
}

export default App;

