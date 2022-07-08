import "./GameOver.scss";
import React, { useContext, useState } from "react";
import Leaderboard from "./Leaderboard";
import { ScoreContext } from "./GameBoard";

export default function GameOver() {
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)
  const [disableButton, setDisableButton] = useState(false);
  const playerScore = useContext(ScoreContext);

  return (
    <>
      {!leaderboardVisible ? (
        <>
          <div className="gameover-text animate__animated animate__zoomInDown animate__slow">
            Game Over
          </div>
          <div className="gameover animate__animated animate__jackInTheBox">
            <div className="gameover-score">
              <div className="gameover-score-text animate__animated animate__fadeIn animate__delay-1s animate__slower">
                <div className="gameover-score-text-top">Final Score</div>
                <div className="gameover-score-text-bottom">{playerScore}</div>
              </div>
            </div>
            Scores can be submitted on Leaderboard screen
            <div className="gameover-buttons">
              <button
                className="gameover-buttons-left"
                onClick={() => window.location.reload(false)}
              >
                Play Again
              </button>
              <button onClick={() => setLeaderboardVisible(true)}>
                Leaderboard
              </button>
            </div>
          </div>
        </>
      ) : (
        <Leaderboard
          setLeaderboardVisible={setLeaderboardVisible}
          disableButton={disableButton}
          setDisableButton={setDisableButton}
        />
      )}
    </>
  );
}
