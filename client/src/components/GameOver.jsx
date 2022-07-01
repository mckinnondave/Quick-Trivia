import './GameOver.scss'
import React, { useState } from 'react'

export default function GameOver({questionScore}) {
  const [listOfScores, setListOfScores] = useState([{id:1, name: "Jack", category: "Film & TV", score: 700}])
  return (
    <>
    <div className='gameover animate__animated animate__jackInTheBox'>
      <div className='gameover-text animate__animated animate__zoomInDown animate__slow'>Game Over</div>
      <div className='gameover-score'>
        <div className='gameover-score-text animate__animated animate__fadeIn animate__delay-1s animate__slower'>
          <div className='gameover-score-text-top'>Final Score</div>
          <div className='gameover-score-text-bottom'>{questionScore}</div>
        </div>
      </div>
      <button className='return' onClick={() => window.location.reload(false)}>Play Again?</button>
    </div>

    <div className='getScores'></div>
      {listOfScores.map((score) => {
        return (
        <div>
          <h1>Name: {score.name}</h1>
          <h1>Category: {score.category}</h1>
          <h1>Score: {score.score}</h1>
        </div>
        )
      })}
    </>
  )
}