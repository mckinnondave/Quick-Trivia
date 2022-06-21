import React, {useState} from 'react';
import './GameBoard.scss'
import sortQuestion from '../../helpers/Sorting';

export default function GameBoard({questions}) {
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [answers, setAnswers] = useState([])
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false)
  const [falseAnswerSelected, setFalseAnswerSelected] = useState(false)
  const [hideButton, setHideButton] = useState(false)

  // Array of 10 questions
  let myQuestions = questions;

  const handleClick = (e) => {
    e.preventDefault();
    setHideButton(true)
    setCurrentQuestion(questions[0].question)
    setAnswers(sortQuestion(questions[0]))
  }

  const handleAnswer = (value) => {
    if (value === questions[0].correctAnswer) {
      console.log("RIGHT!");
      setCorrectAnswerSelected(true);
      setCurrentQuestion(`CORRECT! The answer is "${questions[0].correctAnswer}!"`)
    }
    if (value !== questions[0].correctAnswer) {
      console.log("WRONG");
      setFalseAnswerSelected(true);
      setCurrentQuestion(`Incorrect. The answer is "${questions[0].correctAnswer}"`)
    }
    myQuestions.length > 0 ? myQuestions.shift() : setCurrentQuestion("Out of Questions");
      console.log("QQQQQQQ", myQuestions);
  }

  const setCorrectColor = correctAnswerSelected ? "right-answer" : "";
  const setFalseColor = falseAnswerSelected ? "wrong-answer" : "";

  return (
    <div className={`board ${setCorrectColor} ${setFalseColor}`}>
      <div className="board-container">
        {!hideButton ? (
          <div className="board-start">
            <button onClick={handleClick}>Begin!</button>
          </div>
        ) : (
          <>
            <div className="board-question">{currentQuestion}</div>
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
  );
}