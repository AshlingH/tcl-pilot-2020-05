import React, { useEffect, useState } from 'react';
import Pin from './Pins';


//creates promise to fetch data
const fetchNearbyPlacesPromise = async (lat, lng) => {
    let url = `https://segdeha.com/api/nearby.php?lat=${lat}&lng=${lng}`
    let response = await fetch(url);

    let output;
    if(response.ok){
        output = await response.json();

    } else {
        console.log("Error" + response.status);
        output = { };
    }
    return output;
}

//executes the fetch, and formats data for consumption by Pin component
async function fetchNearbyPlaces(lat, lng) {
    let places = await fetchNearbyPlacesPromise(lat,lng).then(res => {console.log(res); return res.query.pages;});
    if(places){
        return places.map( (place) => {
            const latitude = place.coordinates[0].lat
            const longitude = place.coordinates[0].lon
            const description = place.description;
            const title = place.title;
            const image = place.thumbnail? place.thumbnail.source: null;
            const dict = {latitude, longitude, description, title, image};
            return dict;
        });
        } else {
    // might want to differentiate between error and no outputs in the future. Currently will render same thing.
        return [];
    }
}

// Looks for all nearby places, generates a list, and maps child Pin components for each place

const NearbyPins = ({lat, lng}) => {
    const [nearbyPlaces, setNearbyPlaces] = useState([]);

    useEffect(()=> {
        let fetchNearby = fetchNearbyPlaces(lat, lng).then(res => {console.log(res); setNearbyPlaces(res)});
    }, [])

    return (
        <React.Fragment>
            {nearbyPlaces?
                (nearbyPlaces.map(
                    ({latitude,longitude,title,description,image}, index) => <Pin key={index} lat={latitude} lng={longitude} title={title} description={description} image={image} />))
                :
                null
            }

        </ React.Fragment>
    )

}

export default NearbyPins;