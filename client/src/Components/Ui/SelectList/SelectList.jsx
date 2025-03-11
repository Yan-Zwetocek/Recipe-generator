import React from "react";

const SelectList = ({ id, options, value, onChange, ...props }) => {
  return (
    <select 
      id={id} 
      className={`form-select ${props.className}`} 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>Выберите</option>
      {options.map((option, value,  index) => (
        <option key={index} value={value + 1}>
          {option}, {value +1}
        </option>
      ))}
    </select>
  );
};


export default SelectList;

