import '../styles/CurrentTemperature.css'; // Import the CSS file for App

function CurrentTemperature(props) {
    return (
        <div id="temperature-container">
            <p id="temperature">{(props.temperature === null ? "-" : props.temperature)}</p> <p id="degrees">°</p>
        </div>
    );
}

export default CurrentTemperature;