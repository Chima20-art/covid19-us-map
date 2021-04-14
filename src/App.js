import "./App.css";
import Map from "react-usa-map";

import usStates from "./usStates.json";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rawData, setRawData] = useState(null);
  const [minData, setMinData] = useState(null);
  const [maxData, setMaxData] = useState(null);
  const [cases, setCases] = useState(null);

  useEffect(() => {
    var data = [];
    usStates.forEach((item) => {
      data.push({
        name: item.abbreviation,
        cases: Math.floor(Math.random() * 6000),
        fullName: item.name,
      });
    });

    //console.log(data[2].cases);
    const cases = [];
    data.forEach((item) => {
      cases.push(item.cases);
    });

    var min = Math.min.apply(Math, cases);

    console.log("minData is : " + min);
    var max = Math.max.apply(Math, cases);

    console.log("maxData is : " + max);

    data = data.map((a) => {
      var percentage = parseInt((a.cases * 100) / max);
      var color = "hsl(0,100%," + (100 - percentage) + "%)";
      return {
        name: a.name,
        cases: a.cases,
        color: color,
        fullName: a.fullName,
      };
    });

    setMaxData(max);
    setRawData(data);
    setCases(cases);
    setMinData(min);
    setLoading(false);
    return () => {};
  }, []);

  const mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  const statesCustomConfig = () => {
    var config = {};
    rawData.forEach((item) => {
      config[item.name] = {
        fill: item.color,
        clickHandler: (event) => {
          alert(item.fullName + " has " + item.cases);
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
