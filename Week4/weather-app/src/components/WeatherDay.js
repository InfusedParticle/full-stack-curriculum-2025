import React from "react";
import "../styles/WeatherDay.css"; // Import the CSS file for MainContainer
function WeatherDay(props) {
    
    return (
        <div class="day-container">
            <div class="left-day">
                <img src={props.data.icon} alt="" class="weather-icon"></img>
                <h4 class="day-text">{props.data.day}</h4>
            </div>
            <div class="right-day">
                <p>{props.data.low + "°"}</p>
                <div class="line"></div>
                <p>{props.data.high + "°"}</p>
            </div>
        </div>
    )
}

export default WeatherDay;