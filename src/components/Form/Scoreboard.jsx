import './Scoreboard.scss'
import React from 'react'

export default function Scoreboard({countdown, count, questionScore}) {
  

  return (
    <div className='scoreboard animate__animated animate__bounceInDown'>
      <div className='scoreboard-score'>
        <div className='scoreboard-score-top'>Score</div>
        <div className='scoreboard-score-bottom'>{questionScore}</div>
      </div>
      <div className='scoreboard-timer'>{countdown/1000}</div>
      <div className='scoreboard-question'>
        <div className='scoreboard-question-top'>Question</div>
        <div className='scoreboard-question-bottom'>{count}/10</div>
      </div>
    </div>
  )
}