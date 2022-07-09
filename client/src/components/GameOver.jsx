import "./GameOver.scss";
import React, { useContext, useState } from "react";
import Leaderboard from "./Leaderboard";
import { ScoreContext } from "./GameBoard";
import useSound from 'use-sound'
import cheerSfx from '../sounds/cheers.wav'
import { useEffect } from "react";

export default function GameOver({ buttonSound, mainTheme }) {
  const [leaderboardVisible, setLeaderboardVisible] = useState(false)
  const [disableButton, setDisableButton] = useState(false);
  const [cheerSound] = useSound(cheerSfx, {volume: 0.7})
  const playerScore = useContext(ScoreContext);

  useEffect(() => {
    mainTheme.fade(0.1, 0.5, 1000)
  }, [mainTheme])
 
  return (
    <>
      {!leaderboardVisible && cheerSound()}
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
            <div className="gameover-info">Scores can be submitted on Leaderboard screen</div>
            <div className="gameover-buttons">
              <button
                className="gameover-buttons-left"
                onClick={() => {buttonSound(); window.location.reload(false)}}
              >
                Play Again
              </button>
              <button onClick={() => {setLeaderboardVisible(true); buttonSound()}}>
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
          buttonSound={buttonSound}
        />
      )}
    </>
  );
}
