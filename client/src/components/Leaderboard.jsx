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
      <div className="leaderboard">
        {listOfScores.map((score) => {
          return (
            <div key={uniqueID()}>
              <h3>Name: {score.name}</h3>
              <h3>Category: {score.category}</h3>
              <h3>Score: {score.score}</h3>
            </div>
          );
        })}
      </div>

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