import React, { useEffect, useState } from "react";
import "./GameBoard.scss";
import Scoreboard from "./Scoreboard";
import sortQuestion from "../helpers/Sorting";
import "animate.css";
import { useCountdownTimer } from "use-countdown-timer";
import GameOver from "./GameOver";
import useSound from 'use-sound'
import correctSfx from '../sounds/correct.wav'
import incorrectSfx from '../sounds/incorrect.wav'

export const ScoreContext = React.createContext();

export default function GameBoard({ questions, buttonSound, mainTheme }) {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [falseAnswerSelected, setFalseAnswerSelected] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [count, setCount] = useState(1);
  const [questionScore, setQuestionScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [correctSound] = useSound(correctSfx)
  const [incorrectSound] = useSound(incorrectSfx)

  // Countdown timer variables
  const { countdown, start, reset, pause } = useCountdownTimer({
    timer: 1000 * 20,
  });

  // Array of 10 questions
  let myQuestions = questions;

  // Prepares gameboard for first question - hides begin button, selects first question, and starts the timer
  const handleClick = (e) => {
    e.preventDefault();
    buttonSound();
    setHideButton(true);
    setCurrentQuestion(myQuestions[0].question);
    setAnswers(sortQuestion(myQuestions[0]));
    start();
    mainTheme.fade(0.5, 0.2, 1000)
  };

  // Handles situation where no answer is selected
  useEffect(() => {
    if (countdown === 0) {
      myQuestions.shift();
      setFalseAnswerSelected(true);
      setCurrentQuestion("Timeup");

      setTimeout(() => {
        if (myQuestions.length !== 0) {
          reset();
          setCount((prev) => prev + 1);
          setCurrentQuestion(myQuestions[0].question);
          setAnswers(sortQuestion(myQuestions[0]));
          setFalseAnswerSelected(false);
          start();
        }

        if (myQuestions.length === 0) {
          console.log("Out of Questions!!");
          setFalseAnswerSelected(false);
          setGameComplete(true);
        }
      }, 3500);
    }
  }, [start, countdown, reset, myQuestions, pause]);

  // Handles correct or incorrect answers and then resets for next question
  const handleAnswer = (value) => {
    setDisableButton(true);
    pause();

    // Handle correct answer
    if (value === myQuestions[0].correctAnswer) {
      console.log("RIGHT!");
      setCorrectAnswerSelected(true);
      correctSound()
      setCurrentQuestion(
        `CORRECT! The answer is "${myQuestions[0].correctAnswer}!"`
      );
      setQuestionScore((prev) => prev + (countdown / 100) * 1.5);
    }

    // Handle incorrect answer
    if (value !== myQuestions[0].correctAnswer) {
      console.log("WRONG");
      setFalseAnswerSelected(true);
      incorrectSound()
      setCurrentQuestion(
        `Incorrect. The answer is "${myQuestions[0].correctAnswer}"`
      );
    }

    // Remove question from array once answered
    myQuestions.shift();

    // Display next question if there are still more questions to go through while also resetting timer
    setTimeout(() => {
      if (myQuestions.length !== 0) {
        reset();
        setCount((prev) => prev + 1);
        setCurrentQuestion(myQuestions[0].question);
        setAnswers(sortQuestion(myQuestions[0]));
        setCorrectAnswerSelected(false);
        setFalseAnswerSelected(false);
        setDisableButton(false);
        start();
      } else {
        console.log("Out of Questions!!");
        setGameComplete(true);
      }
    }, 3500);
  };

  const setCorrectColor = correctAnswerSelected
    ? "right-answer animate__animated animate__shakeY"
    : "";
  const setFalseColor = falseAnswerSelected
    ? "wrong-answer animate__animated animate__shakeX"
    : "";
  const setDisabled = disableButton ? "disabled-btn" : "";

  return (
    <>
      <ScoreContext.Provider value={questionScore}>
        {!gameComplete ? (
          <>
            <Scoreboard countdown={countdown} count={count} />
            <div className={`board ${setCorrectColor} ${setFalseColor} `}>
              <div className="board-container ">
                {!hideButton ? (
                  <div className="board-start animate__animated animate__fadeIn animate__delay-1s">
                    <button onClick={handleClick}>Begin!</button>
                  </div>
                ) : (
                  <>
                    <div className="board-question ">{currentQuestion}</div>
                    <div className="board-btns">
                      <button
                        className={`${setDisabled}`}
                        onClick={() => handleAnswer(answers[0])}
                      >
                        {answers[0]}
                      </button>
                      <button
                        className={`${setDisabled}`}
                        onClick={() => handleAnswer(answers[1])}
                      >
                        {answers[1]}
                      </button>
                      <button
                        className={`${setDisabled}`}
                        onClick={() => handleAnswer(answers[2])}
                      >
                        {answers[2]}
                      </button>
                      <button
                        className={`${setDisabled}`}
                        onClick={() => handleAnswer(answers[3])}
                      >
                        {answers[3]}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <GameOver buttonSound={buttonSound} mainTheme={mainTheme}/>
        )}
      </ScoreContext.Provider>
    </>
  );
}
