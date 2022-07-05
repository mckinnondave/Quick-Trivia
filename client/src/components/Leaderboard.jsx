import './Leaderboard.scss'
import React, { useEffect, useState, useContext } from 'react'
import Axios from "axios";
import { SelectionContext } from './SelectForm';

export default function Leaderboard() {
  const [listOfScores, setListOfScores] = useState([])
  const [name, setName] = useState("")

  const categorySelection = useContext(SelectionContext)
  console.log("SELECTION", categorySelection)

  useEffect(() => {
    Axios.get("http://localhost:3001/getScores").then((response) => {
      setListOfScores(response.data)
    })
  }, [])

  const saveScore = () => {
    Axios.post("http://localhost:3001/postScore", {name: name, category: categorySelection.label, score: 500}).then((response) => {
      setListOfScores([...listOfScores, {name: name, category: categorySelection.label, score: 500}])
      alert("Score Saved!")
    })
  }

  return ( 
    <>
      <div className="leaderboard">
        {listOfScores.map((score) => {
          return (
            <div key={score.id}>
              <h3>Name: {score.name}</h3>
              <h3>Category: {score.category}</h3>
              <h3>Score: {score.score}</h3>
            </div>
          );
        })}
      </div>

      <div>
        <input type="text" placeholder='name' onChange={(event) => {
          setName(event.target.value);
        }}/>
        <button onClick={saveScore}>Send</button>
      </div>
    </>
  );
}