import "./Leaderboard.scss";
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { SelectionContext } from "./SelectForm";
import { ScoreContext } from "./GameBoard";
import uniqueID from "../helpers/uniqueID";

export default function Leaderboard({setLeaderboardVisible}) {
  const [listOfScores, setListOfScores] = useState([]);
  const [name, setName] = useState("");
  const [showNameInputForm, setShowNameInputForm] = useState(false);

  const categorySelection = useContext(SelectionContext);
  const playerScore = useContext(ScoreContext);

  useEffect(() => {
    Axios.get("https://trivia-react-game.herokuapp.com/getScores").then(
      (response) => {
        setListOfScores(response.data);
      }
    );
  }, [listOfScores]);

  const saveScore = () => {
    Axios.post("https://trivia-react-game.herokuapp.com/postScore", {
      name: name,
      category: categorySelection.label,
      score: playerScore,
    }).then((response) => {
      setListOfScores([
        ...listOfScores,
        { name: name, category: categorySelection.label, score: playerScore },
      ]);
      alert("Score Saved!");
    });
  };

  return (
    <>
    <div className="leaderboard-title animate__animated animate__bounceInLeft">
      Leaderboard
    </div>
      <table className="leaderboard animate__animated animate__bounceInRight">
        <thead className="leaderboard-header">
          <tr>
            <th>Rank</th>
            <th className="leaderboard-name">Name</th>
            <th className="leaderboard-category">Category</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {listOfScores.map((score, index) => {
            return (
              <tr key={uniqueID()}>
                <th>{index + 1}</th>
                <th className="leaderboard-name">{score.name}</th>
                <th className="leaderboard-category">{score.category}</th>
                <th>{score.score}</th>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="bottom-buttons animate__animated animate__bounceInUp">
        {/* <input
          type="text"
          placeholder="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        /> */}
        <button onClick={() => setLeaderboardVisible(false)}>Back</button>
        <button onClick={() => window.location.reload(false)}>Play Again</button>
        <button onClick={() => setShowNameInputForm(true)}>Submit Score</button>
      </div>
    </>
  );
}
