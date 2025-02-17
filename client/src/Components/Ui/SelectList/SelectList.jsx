import React from "react";

const SelectList = ({ id, options, ...props }) => {
  return (
    <div>
      <select id={id} className={`form-select ${props.className}`}>
        <option selected> Нет выбрано</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectList;

