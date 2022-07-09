import "./Leaderboard.scss";
import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { SelectionContext } from "./SelectForm";
import { ScoreContext } from "./GameBoard";
import uniqueID from "../helpers/uniqueID";
import Spinner from "./Spinner";
import useSound from 'use-sound'
import savedSfx from '../sounds/saved.wav'

export default function Leaderboard({ setLeaderboardVisible, disableButton, setDisableButton, buttonSound }) {
  const [listOfScores, setListOfScores] = useState([]);
  const [name, setName] = useState("");
  const [showNameInputForm, setShowNameInputForm] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [savedSound] = useSound(savedSfx, {volume: 0.5})

  const categorySelection = useContext(SelectionContext);
  const playerScore = useContext(ScoreContext);

  // Causes initial render of leaderboard and responsible for handling loading if waiting on Axios response
  useEffect(() => {
    setLeaderboardLoading(true);
    Axios.get("https://trivia-react-game.herokuapp.com/getScores").then(
      (response) => {
        setListOfScores(response.data);
        setLeaderboardLoading(false);
      }
    );
  }, []);

  // Causes re-render of leaderboard when player adds their score
  useEffect(() => {
    Axios.get("https://trivia-react-game.herokuapp.com/getScores").then(
      (response) => {
        setListOfScores(response.data);
      }
    );
  }, [listOfScores]);

  const saveScore = () => {
    setDisableButton(true);
    Axios.post("https://trivia-react-game.herokuapp.com/postScore", {
      name: name,
      category: categorySelection.label,
      score: playerScore,
    }).then((response) => {
      setListOfScores([
        ...listOfScores,
        { name: name, category: categorySelection.label, score: playerScore },
      ]);
      setShowNameInputForm(false);
    });
  };

  const setDisabled = disableButton ? "disabled-leaderboard-btn" : "";

  return (
    <>
      {leaderboardLoading ? (
        <Spinner />
      ) : (
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

          {/* Score submit popup */}
          {showNameInputForm && (
            <div className="prompt-box animate__animated animate__zoomIn animate__faster">
              Please enter your name or initials below{" "}
              <b>Thanks for playing!</b>
              <input
                type="text"
                placeholder="Enter name here"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <div className="prompt-box-btn">
                <button
                  onClick={() => {
                    saveScore();
                    setDisableButton(true);
                    savedSound();
                  }}
                >
                  Submit
                </button>
                <button onClick={() => {setShowNameInputForm(false); buttonSound()}}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bottom-buttons animate__animated animate__bounceInUp">
            <button onClick={() => {setLeaderboardVisible(false); buttonSound()}}>Back</button>
            <button onClick={() => {buttonSound(); window.location.reload(false)}}>
              Play Again
            </button>
            <button
              className={`${setDisabled}`}
              onClick={() => {setShowNameInputForm(true); buttonSound()}}
            >
              Submit Score
            </button>
          </div>
        </>
      )}
    </>
  );
}
