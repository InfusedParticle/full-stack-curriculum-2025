import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer

import CurrentTemperature from "./CurrentTemperature";
import WeatherDay from "./WeatherDay";

const apiKey = "[redacted]";

function MainContainer(props) {

  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */
  
  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  
  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */

  useEffect(() => {
      if(props.selectedCity === null) {
        return;
      }

      const {lat, lon} = props.selectedCity;

			let forecastApiCall = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
			fetch(forecastApiCall)
			.then(response => response.json())
			.then(data => setWeather(data))
			.catch(error => console.log(error));

			let weatherApiCall = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
			fetch(weatherApiCall)
			.then(response => response.json())
			.then(data => setForecast(data))
			.catch(error => console.log(error));
  }, [props.selectedCity])
  
  if(weather === null || forecast === null) {
    return (
      <div id="main-container">
        <div id="weather-container">
          
        </div>
      </div>
    )
  }

  console.log(weather);
  
  const getFahrenheitFromKelvin = (kelvin) => {
    const celsius = kelvin - 273;
    const fahrenheit = Math.round(celsius * 1.8) + 32;
    return fahrenheit;
  }

  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let weatherArr = [];
  let curIndex = 0;
  let dayIndex = new Date().getDay();
  for(let i = 0; i < 5; i++) {
    let low = weather['list'][curIndex]['main']['temp_min'];
    let high = weather['list'][curIndex]['main']['temp_max'];
    let icon = weather['list'][curIndex]['weather'][0]['icon'];
    for(let timestamp = 0; timestamp < 8; timestamp++) {
      let timestampData = weather['list'][curIndex];
      let timestampHigh = timestampData['main']['temp_max'];
      let timestampLow = timestampData['main']['temp_min'];
      low = Math.min(low, timestampLow);
      high = Math.max(high, timestampHigh);
      curIndex++;
    }
    low = getFahrenheitFromKelvin(low);
    high = getFahrenheitFromKelvin(high);
    let weatherParams = {"day": week[dayIndex], "low": low, "high": high, "icon": `../icons/${icon}.svg`};
    weatherArr[i] = weatherParams;
    dayIndex = (dayIndex + 1) % 7;
  }

  return (
    <div id="main-container">
      <div id="weather-container">
        <h1 id="city-name">{props.selectedCity.fullName}</h1>
        <CurrentTemperature temperature={getFahrenheitFromKelvin(forecast['main']['temp'])}></CurrentTemperature>
        <div id="week-container">
          <WeatherDay data={weatherArr[0]}></WeatherDay>
          <WeatherDay data={weatherArr[1]}></WeatherDay>
          <WeatherDay data={weatherArr[2]}></WeatherDay>
          <WeatherDay data={weatherArr[3]}></WeatherDay>
          <WeatherDay data={weatherArr[4]}></WeatherDay>
        </div>
        {/* 
        STEP 4: Display Weather Data.
        
        With the fetched weather data stored in state, use conditional rendering (perhaps the ternary operator) 
        to display it here. Make sure to check if the 'weather' state has data before trying to access its 
        properties to avoid runtime errors. 

        Break down the data object and figure out what you want to display (e.g., temperature, weather description).
        This is a good section to play around with React components! Create your own - a good example could be a WeatherCard
        component that takes in props, and displays data for each day of the week.
        */}
      </div>
    </div>
  );
}


export default MainContainer;

