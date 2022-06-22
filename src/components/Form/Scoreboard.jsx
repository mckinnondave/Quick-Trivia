import './Scoreboard.scss'
import React from 'react'

export default function Scoreboard() {
  return (
    <div className='scoreboard'>
      <div className='scoreboard-score'></div>
      <div className='scoreboard-timer'></div>
      <div className='scoreboard-question'></div>
    </div>
  )
}