import React, { useEffect, useState } from 'react';

function Tempapp() {
  const API_KEY = "807ade60569a4e7b8dc125231240906";
  const [city, setCity] = useState("Ahmedabad");
  const [search, setSearch] = useState("Ahmedabad");
  const [temp, setTemp] = useState(null);
  const [currentLiveTime, setCurrentLiveTime] = useState(null);

  const setCityName = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length >= 3) {
      setCity(event.target.value);
    }
  };

  const fetchApi = async (city) => {
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
      const response = await fetch(url);
      const resJson = await response.json();
      setTemp(resJson?.current?.temp_c);
    } catch (error) {
      console.error("Error fetching the API:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentLiveTime(date.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (city.length >= 3) {
      fetchApi(city);
    }
  }, [city]);

  return (
    <div>
      <div style={{ height: "500px", width: "500px", border: "1px solid black", backgroundColor: "lightblue" }}>
        <p style={{ fontSize: "2.5rem", height: "30px" }}>{currentLiveTime}</p>
        <h1>Weather</h1>
        <input type='text' onChange={setCityName} value={search} placeholder='Enter city name' style={{ height: "18px", border: "13px" }} />
        <input type="button" value="X" onClick={() => setSearch("")} style={{ marginLeft: "3px" }} />
        <p>{city}</p>
        <p>{new Date().toLocaleString()}</p>
        <p>Temperature</p>
        {temp === undefined ? <p>Invalid city</p> : <p>{temp} °C</p>}
      </div>
    </div>
  );
}

export default Tempapp;
