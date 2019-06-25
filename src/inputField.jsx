import React, { Component } from 'react'
import Input from 'react-validation/build/input';

export default function InputField () {
  return (
    <span>
      <p className="query-item query-tags">join</p>
      <Input name="join" type="text" placeholder="Table name" className="query-item input-query"/>
    </span> 
  )
}
