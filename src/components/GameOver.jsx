import './GameOver.scss'
import React from 'react'

export default function GameOver() {
  return (
    <div className='gameover animate__animated animate__jackInTheBox'>
      <div className='gameover-text animate__animated animate__zoomInDown animate__slow'>Game Over</div>
      <div className='gameover-score'></div>
      <button className='return' onClick={() => window.location.reload(false)}>Back to Start</button>
    </div>
  )
}