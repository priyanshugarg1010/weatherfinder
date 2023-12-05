/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiKey } from "../env";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherCurrent, setWeatherCurrent] = useState();
  const [weatherLocation, setWeatherLocation] = useState();
  const [date, setDate] = useState();

  const getDate = () => {
    let apiDateFormat = "";
    if (weatherLocation) {
      const localTime = weatherLocation.localtime;
      console.log(weatherLocation.localtime);
      // const localTime = "2023-11-25 4:28";

      // Extract the date portion
      const dateOnly = localTime.split(" ")[0];
      apiDateFormat = dateOnly;
    } else {
      const today = new Date();

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(today.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      apiDateFormat = formattedDate;
    }

    const dateObj = new Date(apiDateFormat);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    // Remove commas from the formatted date
    const formattedDateWithoutCommas = formattedDate.replace(/,/g, "");

    console.log(formattedDateWithoutCommas); // Output: Thursday May 10 2020
    setDate(formattedDateWithoutCommas);
  };

  // useEffect(()=>{
  // getDate()
  // },[date])

  const fetchWeather = () => {
    // Replace with your actual API key

    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then((response) => {
        console.log(response.data); // Log the data received from the API
        setWeatherCurrent(response.data.current);
        setWeatherLocation(response.data.location);
        console.log(weatherCurrent); // Assuming you have a state variable named 'weather' to store the data
        console.log(weatherLocation); // Assuming you have a state variable named 'weather' to store the data
      })
      .catch((error) => console.log(error.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
    getDate();
  };
  return (
    <>
      <h1 className="py-4 text-5xl text-black font-serif text-center flex justify-center">
        Search Weather
      </h1>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter city name"
              className="px-4 py-3 w-80 mr-1 border-zinc-400 border-2 border-solid rounded-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-3 bg-purple-500 text-white rounded-md"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center ">
          {weatherLocation && (
            <>
              <div className=" flex items-center justify-center  border-2 shadow-md w-72  rounded-md ">
                <div className="flex flex-col bg-white rounded p-4  max-w-xs w-full">
                  <div className="font-bold text-xl">
                    {weatherLocation.name}
                  </div>
                  <div className="text-sm text-gray-500">{date}</div>
                  <div className="mt-6  self-center inline-flex items-center justify-center rounded-lg  h-32 w-32">
                    <img
                      className="text-2xl w-full object-contain h-full"
                      src={weatherCurrent.condition.icon}
                    />{" "}
                  </div>
                  <div className="flex flex-row items-center justify-center mt-6">
                    <div className="font-medium text-6xl">
                      {weatherCurrent.temp_c}
                    </div>
                    <div className="flex flex-col items-center ml-6">
                      <div>{weatherCurrent.condition.text}</div>
                      {/* <div className="mt-1">
                        <span className="text-sm">
                          <i className="far fa-long-arrow-up"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          28°C
                        </span>
                      </div> */}
                      {/* <div>
                        <span className="text-sm">
                          <i className="far fa-long-arrow-down"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          20°C
                        </span>
                      </div> */}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Wind</div>
                      <div className="text-sm text-gray-500">
                        {weatherCurrent.wind_kph}km/h
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Humidity</div>
                      <div className="text-sm text-gray-500">
                        {weatherCurrent.humidity}%
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Visibility</div>
                      <div className="text-sm text-gray-500">
                        {weatherCurrent.vis_km}km/h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
