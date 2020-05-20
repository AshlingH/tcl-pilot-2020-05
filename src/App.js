import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [marker, allowMarker] = useState(null);
  const [data, setData] = useState({
    // default data - center currently set to Cork, Ireland
    center: {
      lat: 51.8985,
      lng: -8.4756,
    },
    zoom: 11,
  });

  const handleClick = () => {
    allowMarker(true);
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      let latitude = crd.latitude;
      let longitude = crd.longitude;

      setData({
        ...data,
        center: {
          lat: latitude,
          lng: longitude,
        },
      });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div className="App">
      <Header />
      <Main data={data} />
      <Footer handleClick={handleClick} marker={marker} />
    </div>
  );
}

export default App;
