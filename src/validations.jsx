import validator from 'validator';
import React from 'react'

export const spaces = (value) => {
  if (value.indexOf(" ") >= 0) {
    return <span className="error-message">can only select one table</span>;
  }
};

