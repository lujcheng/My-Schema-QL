import validator from 'validator';
import React from 'react'

export const required = (value) => {
  if (!value.toString().trim().length) {
    return <span className="error-message">require</span>;
  }
};

export const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="error-message">`${value} is not a valid email.`</span>
  }
};