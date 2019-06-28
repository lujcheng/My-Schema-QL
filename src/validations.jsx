import validator from 'validator';
import React from 'react'

export const required = (value) => {
  if (value.split("").length == 0 ) {
    return <span className="error-message">required</span>;
  }
}

export const spaces = (value) => {
  if (value.indexOf(" ") >= 0) {
    return <span className="error-message">can only select one table</span>;
  }
};

export const where = (value) => {
  if (value.split(" ").length !== 3) {
    return <div><span className="error-message">expected: (val operator val)</span></div>;
  }
}

