import React, { useState } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

const MapGL = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '50rem',
    latitude: -33.129631,
    longitude: -64.341005,
    zoom: 13
  });

  const TOKEN =
    'pk.eyJ1IjoiYWxla3NleWsiLCJhIjoiY2p5czM4b3FrMGhyOTNidGtqNWcxcm5jaSJ9.divlSaTHhlRzjLPzUL8YRA'; //Cuando haga esto poner el token en el .env, esta mal aca.

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/alekseyk/cjys3xwbh08671cpj51h18pog"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={
          viewport => setViewport({ ...viewport })
          // Optionally call `setState` and use the state to update the map.
        }
      />
    </div>
  );
};

export default MapGL;
