import React, {useState} from 'react';
import './GameBoard.scss'
import sortQuestion from '../../helpers/Sorting';

export default function GameBoard({questions}) {
  const [answers, setAnswers] = useState([])

  const handleClick = (e) => {
    e.preventDefault();
    setAnswers(sortQuestion(questions[0]))
  }
  console.log("ANSWERS", answers)

  return (
    <div className='board'>
      <button onClick={handleClick}>Start!</button>
    </div>
  )
}