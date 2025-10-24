import {React, useState} from "react"

const Scoreboard = (props) => {
    const [team1Score, setTeam1Score] = useState(0);
    const [team2Score, setTeam2Score] = useState(0);
    
    // setTeam1Score(team1Score + 1)
    return (
        <div>
            {props.team1} vs {props.team2}
            <div>
                <button onClick={() => setTeam1Score(team1Score + 1)}>{props.team1}: {team1Score}</button>
                <button onClick={() => setTeam2Score(team2Score + 1)}>{props.team2}: {team2Score}</button>
            </div>
        </div>
    )
};

export default Scoreboard;