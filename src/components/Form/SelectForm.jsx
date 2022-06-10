import React, { useState } from "react";
import axios from "axios";
import "./SelectForm.scss";
import Select from "react-select";
import GameBoard from "./GameBoard";

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

// Involved with selecting the category and calling for questions
export default function SelectForm() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Prevent refresh and uses getInfo function to find questions
  function handleClick(e) {
    e.preventDefault();
    getInfo(selectedOption.value);
  }

  // Takes selected category from form and finds questions after submit button is clicked
  const getInfo = (category) => {
    const options = {
      method: "GET",
      url: "https://trivia8.p.rapidapi.com/questions",
      params: { limit: "10", categories: `${category}` },
      headers: {
        "X-RapidAPI-Host": "trivia8.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setQuestions(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <form className="select-form">
        <div className="select-form-container">
          <div className="select-form-name">
            Feeling smart? Well then, select a category and prove it!
          </div>
          <div className="select-form-selector">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <button className="select-form-btn" onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
      <GameBoard questions={questions} />
    </>
  );
}
