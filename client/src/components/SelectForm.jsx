import React, { useState } from "react";
import axios from "axios";
import "./SelectForm.scss";
import Select from "react-select";
import GameBoard from "./GameBoard";
import Spinner from "./Spinner";
import useSound from 'use-sound'
import buttonSfx from '../sounds/button.wav'
import {Howl, Howler} from 'howler'
import electroSwing from '../sounds/electroSwing.mp3'

export const SelectionContext = React.createContext();

const options = [
  { value: "arts_and_literature", label: "Arts & Literature" },
  { value: "film_and_tv", label: "Film & TV" },
  { value: "food_and_drink", label: "Food & Drink" },
  { value: "general_knowledge", label: "General Knowledge" },
  { value: "geography", label: "Geography" },
  { value: "history", label: "History" },
  { value: "music", label: "Music" },
  { value: "science", label: "Science" },
  { value: "society_and_culture", label: "Society & Culture" },
  { value: "sport_and_leisure", label: "Sport & Leisure" },
];

let mainTheme = new Howl({
  src: [electroSwing],
  volume: 0.5,
  loop: true
})

// Involved with selecting the category and calling for questions
export default function SelectForm() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isFormHidden, setIsFormHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonSound] = useSound(buttonSfx)

  // Prevent refresh and uses getListOfQuestions function to find questions
  function handleClick(e) {
    e.preventDefault();
    getListOfQuestions(selectedOption.value);
    setIsFormHidden(true);
    buttonSound();
    mainTheme.play()
  }

  // Takes selected category from form and finds questions after submit button is clicked
  const getListOfQuestions = (category) => {
    setIsLoading(true)
    const options = {
      method: "GET",
      url: "https://trivia8.p.rapidapi.com/api/questions",
      params: { limit: "10", categories: `${category}` },
      headers: {
        "X-RapidAPI-Host": "trivia8.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("DATA", response.data);
        setQuestions(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const hideForm = isFormHidden ? "select-form-hide" : "";

  return (
    <>
      <SelectionContext.Provider value={selectedOption}>
        {!isFormHidden ? (
          <form
            className={`select-form animate__animated animate__bounceIn ${hideForm}`}
          >
            <div className="select-form-container">
              <div className="select-form-name">
                Feeling smart? Prove it!
                <br />
                Please select a category!
              </div>
              <div className="select-form-selector">
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
              <button className="select-form-btn" onClick={handleClick}>
                Select
              </button>
            </div>
          </form>
        ) : (
          <>{isLoading ? <Spinner /> : <GameBoard questions={questions} buttonSound={buttonSound} mainTheme={mainTheme} />}</>
        )}
      </SelectionContext.Provider>
    </>
  );
}
