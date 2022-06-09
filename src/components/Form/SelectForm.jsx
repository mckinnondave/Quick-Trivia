import React, { useState } from 'react';
import './SelectForm.scss'
import getInfo from '../../helpers/getInfo'
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function SelectForm () {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);
  
  return (
    <div className="select-form">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  )
}