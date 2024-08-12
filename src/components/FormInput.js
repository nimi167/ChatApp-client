// src/components/FormInput.js
import React from 'react';

const FormInput = ({ label, type, inputProps }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type={type} {...inputProps} required />
    </div>
  );
};

export default FormInput;
