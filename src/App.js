import "./App.css";
import Map from "react-usa-map";

import usStates from "./usStates.json";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rawData, setRawData] = useState(null);

  useEffect(() => {
    const data = [];
    usStates.forEach((item) => {
      data.push({
        name: item.abbreviation,
        cases: Math.floor(Math.random() * 6000),
      });
    });
    setRawData(data);
    console.log(data);
    setLoading(false);

    return () => {};
  }, [loading]);

  const mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  const statesCustomConfig = () => {
    var config = {};
    usStates.forEach((item) => {
      config[item.abbreviation] = {
        fill: "black",
        clickHandler: (event) => {
          alert(item.name);
        },
      };
    });

    return config;
  };

  if (loading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  } else if (error !== false) {
    return (
      <div className="App">
        <h1>{error.toString()}</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <Map customize={statesCustomConfig()} onClick={mapHandler} />
    </div>
  );
}

export default App;
