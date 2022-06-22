import React, { useState } from "react";
import "./GameBoard.scss";
import Scoreboard from "./Scoreboard";
import sortQuestion from "../../helpers/Sorting";
import "animate.css";

export default function GameBoard({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [falseAnswerSelected, setFalseAnswerSelected] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  // Array of 10 questions
  let myQuestions = questions;

  const handleClick = (e) => {
    e.preventDefault();
    setHideButton(true);
    setCurrentQuestion(myQuestions[0].question);
    setAnswers(sortQuestion(myQuestions[0]));
  };

  const handleAnswer = (value) => {
    
    // Handle correct answer
    if (value === myQuestions[0].correctAnswer) {
      console.log("RIGHT!");
      setCorrectAnswerSelected(true);
      setCurrentQuestion(
        `CORRECT! The answer is "${myQuestions[0].correctAnswer}!"`
      );
    }

    // Handle incorrect answer
    if (value !== myQuestions[0].correctAnswer) {
      console.log("WRONG");
      setFalseAnswerSelected(true);
      setCurrentQuestion(
        `Incorrect. The answer is "${myQuestions[0].correctAnswer}"`
      );
    }

    // Remove question once determined if answer is correct or incorrect
    myQuestions.shift();

    // Display next question if there are still more questions to go through
    setTimeout(() => {
      if (myQuestions.length !== 0) {
        setCurrentQuestion(myQuestions[0].question);
        setAnswers(sortQuestion(myQuestions[0]));
        setCorrectAnswerSelected(false);
        setFalseAnswerSelected(false);
      } else {
        console.log("Out of Questions!!");
      }
    }, 3500);
  };

  const setCorrectColor = correctAnswerSelected
    ? "right-answer animate__animated animate__shakeY"
    : "";
  const setFalseColor = falseAnswerSelected
    ? "wrong-answer animate__animated animate__shakeX"
    : "";

  return (
    <>
      <Scoreboard />
      <div className={`board ${setCorrectColor} ${setFalseColor} `}>
        <div className="board-container ">
          {!hideButton ? (
            <div className="board-start animate__animated animate__bounceInDown">
              <button onClick={handleClick}>Begin!</button>
            </div>
          ) : (
            <>
              <div className="board-question ">{currentQuestion}</div>
              <div className="board-btns">
                <button onClick={() => handleAnswer(answers[0])}>
                  {answers[0]}
                </button>
                <button onClick={() => handleAnswer(answers[1])}>
                  {answers[1]}
                </button>
                <button onClick={() => handleAnswer(answers[2])}>
                  {answers[2]}
                </button>
                <button onClick={() => handleAnswer(answers[3])}>
                  {answers[3]}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
