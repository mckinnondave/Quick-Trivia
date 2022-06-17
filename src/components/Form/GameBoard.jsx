import React, {useState} from 'react';
import './GameBoard.scss'
import sortQuestion from '../../helpers/Sorting';

export default function GameBoard({questions}) {
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [answers, setAnswers] = useState([])
  console.log("QUESTIONS", questions)

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentQuestion(questions[0].question)
    setAnswers(sortQuestion(questions[0]))
  }
  console.log("ANSWERS", answers)

  return (
    <div className="board">
      <div className="board-container">
        <div className="board-start">
          <button onClick={handleClick}>Start!</button>
        </div>
        <div className='board-question'>
          {currentQuestion}
        </div>
        <div className="board-btns">
          <button value={answers[0]}>{answers[0]}</button>
          <button value={answers[1]}>{answers[1]}</button>
          <button value={answers[2]}>{answers[2]}</button>
          <button value={answers[3]}>{answers[3]}</button>
        </div>
      </div>
    </div>
  );
}