import React, { Component } from 'react'
import Input from 'react-validation/build/input';
import { control } from 'react-validation';

class InputField extends Component {
  
  render() {
    return (
      <>
        <label className="label e">{this.props.queryType}</label>
        <div><input {...this.props} name={this.props.queryType} type="text" placeholder="Table name" className="f input"/></div>
      </> 
    )
  }
}

export default control(InputField); 
