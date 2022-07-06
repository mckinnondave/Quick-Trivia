import "./Leaderboard.scss";
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { SelectionContext } from "./SelectForm";
import { ScoreContext } from "./GameBoard";
import uniqueID from "../helpers/uniqueID";

export default function Leaderboard() {
  const [listOfScores, setListOfScores] = useState([]);
  const [name, setName] = useState("");

  const categorySelection = useContext(SelectionContext);
  const playerScore = useContext(ScoreContext);

  useEffect(() => {
    Axios.get("https://trivia-react-game.herokuapp.com/getScores").then(
      (response) => {
        setListOfScores(response.data);
      }
    );
  }, []);

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
      <table className="leaderboard">
        <tr className="leaderboard-header">
          <th>Name</th>
          <th>Category</th>
          <th>Score</th>
        </tr>
        {listOfScores.map((score) => {
          return (
            <tr key={uniqueID()}>
              <th>{score.name}</th>
              <th>{score.category}</th>
              <th>{score.score}</th>
            </tr>
          );
        })}
      </table>

      <div>
        <input
          type="text"
          placeholder="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button onClick={saveScore}>Send</button>
      </div>
    </>
  );
}
