import React, {useState} from 'react';
import './GameBoard.scss'
import sortQuestion from '../../helpers/Sorting';

export default function GameBoard({questions}) {
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [answers, setAnswers] = useState([])
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false)
  const [falseAnswerSelected, setFalseAnswerSelected] = useState(false)

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentQuestion(questions[0].question)
    setAnswers(sortQuestion(questions[0]))
  }

  const setCorrectColor = correctAnswerSelected ? "right-answer" : "";
  const setFalseColor = falseAnswerSelected ? "wrong-answer" : "";

  const handleAnswer = (value) => {
    if (value === questions[0].correctAnswer) {
      console.log("RIGHT!");
      setCorrectAnswerSelected(true);
      setCurrentQuestion("Correct!")
    }
    if (value !== questions[0].correctAnswer) {
      console.log("WRONG");
      setFalseAnswerSelected(true);
      setCurrentQuestion("Wrong :(")
    }
  }

  return (
    <div className={`board ${setCorrectColor} ${setFalseColor}`}>
      <div className="board-container">
        <div className="board-start">
          <button onClick={handleClick}>Start!</button>
        </div>
        <div className='board-question'>
          {currentQuestion}
        </div>
        <div className="board-btns">
          <button onClick={() => handleAnswer(answers[0])}>{answers[0]}</button>
          <button onClick={() => handleAnswer(answers[1])}>{answers[1]}</button>
          <button onClick={() => handleAnswer(answers[2])}>{answers[2]}</button>
          <button onClick={() => handleAnswer(answers[3])}>{answers[3]}</button>
        </div>
      </div>
    </div>
  );
}