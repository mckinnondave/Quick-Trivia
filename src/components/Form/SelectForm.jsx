import React, { useState } from "react";
import "./SelectForm.scss";
import getInfo from "../../helpers/getInfo";
import Select from "react-select";

const options = [
  { value: "arts_and_literature", label: "Arts & Literature" },
  { value: "film_and_tv", label: "Film & TV" },
  { value: "food_and_drink", label: "Food & Drink" },
  { value: "general_knowledge", label: "General Knowledge" },
  { value: "geography", label: "History" },
  { value: "music", label: "Music" },
  { value: "science", label: "Science" },
  { value: "society_and_culture", label: "Society & Culture" },
  { value: "sports_and_leisure", label: "Sports & Leisure" },
];

// Involved with selecting the category and calling for questions
export default function SelectForm() {
  const [selectedOption, setSelectedOption] = useState(null);

  function handleSubmit (e) {
    e.preventDefault();
    getInfo(selectedOption.value);
  }

  return (
    <form className="select-form" onSubmit={handleSubmit}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
