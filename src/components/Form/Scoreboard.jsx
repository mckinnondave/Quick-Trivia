import './Scoreboard.scss'
import React from 'react'

export default function Scoreboard({countdown}) {

  return (
    <div className='scoreboard animate__animated animate__bounceInDown'>
      <div className='scoreboard-score'>
        <div className='scoreboard-score-top'>Score</div>
        <div className='scoreboard-score-bottom'>0</div>
      </div>
      <div className='scoreboard-timer'>{countdown/1000}</div>
      <div className='scoreboard-question'>
        <div className='scoreboard-question-top'>Question</div>
        <div className='scoreboard-question-bottom'>1/15</div>
      </div>
    </div>
  )
}