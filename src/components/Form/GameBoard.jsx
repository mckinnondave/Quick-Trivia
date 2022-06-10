import React, {useState} from 'react';
import './GameBoard.scss'
import sortQuestion from '../../helpers/Sorting';

export default function GameBoard({questions}) {
  const [thisQuestion, setThisQuestion] = useState("")
  const [answers, setAnswers] = useState([])
  console.log("QUESTIONS", questions)

  const handleClick = (e) => {
    e.preventDefault();
    setThisQuestion(questions[0].question)
    setAnswers(sortQuestion(questions[0]))
  }
  console.log("ANSWERS", answers)

  const checkCorrect = () => {

  }

  return (
    <div className="board">
      <div className="board-container">
        <div className="board-start">
          <button onClick={handleClick}>Start!</button>
        </div>
        <div className='board-question'>
          {thisQuestion}
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