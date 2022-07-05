import './Scoreboard.scss'
import React, { useContext } from 'react'
import { ScoreContext } from './GameBoard'

export default function Scoreboard({countdown, count}) {
  
  const playerScore = useContext(ScoreContext)

  return (
    <div className='scoreboard animate__animated animate__bounceInDown'>
      <div className='scoreboard-score'>
        <div className='scoreboard-score-top'>Score</div>
        <div className='scoreboard-score-bottom'>{playerScore}</div>
      </div>
      <div className='scoreboard-timer'>{countdown/1000}</div>
      <div className='scoreboard-question'>
        <div className='scoreboard-question-top'>Question</div>
        <div className='scoreboard-question-bottom'>{count}/10</div>
      </div>
    </div>
  )
}