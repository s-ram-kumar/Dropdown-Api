import React from 'react';

function Dropdown({ name, options, onChange }) {
  return (
    <select name={name} onChange={onChange}>
      <option value="">Select {name}</option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
