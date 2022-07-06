import "./GameOver.scss";
import React, { useContext } from "react";
import Leaderboard from "./Leaderboard";
import { ScoreContext } from "./GameBoard";

export default function GameOver() {
  const playerScore = useContext(ScoreContext);

  return (
    <>
      <div className="gameover animate__animated animate__jackInTheBox">
        <div className="gameover-text animate__animated animate__zoomInDown animate__slow">
          Game Over
        </div>
        <div className="gameover-score">
          <div className="gameover-score-text animate__animated animate__fadeIn animate__delay-1s animate__slower">
            <div className="gameover-score-text-top">Final Score</div>
            <div className="gameover-score-text-bottom">{playerScore}</div>
          </div>
        </div>
        <button
          className="return"
          onClick={() => window.location.reload(false)}
        >
          Play Again?
        </button>
      </div>
      <Leaderboard />
    </>
  );
}
