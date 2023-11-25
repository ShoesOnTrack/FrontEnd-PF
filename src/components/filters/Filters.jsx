/* eslint-disable react/prop-types */
import React from 'react';
import styles from "./Filters.module.css"

const Filters = ({ name, options, handleChange, state }) => (
    <div
    // className={styles?.selectcontainer}
     >
      <select  name={name} onChange={handleChange} value={state || ""}>
        <option value="" disabled hidden>{name}</option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
  );

export default Filters;