import React from 'react';
import GoogleMapReact from 'google-map-react';

function Map(){
    const defaultLocation = {
        center:{
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11

    };
    return (
        <div style={{ height: 'calc(66.67vh - 1.25rem)', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key:'AIzaSyA_jF-TPUl8qTMZ3BKFTrFOolH9wR7NOz4'}}
            defaultCenter={defaultLocation.center}
            defaultZoom={defaultLocation.zoom}
            >
            
            </GoogleMapReact> 
        </div>
    )
    
}
export default Map