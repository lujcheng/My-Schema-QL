import React, { Component } from 'react'
import Input from 'react-validation/build/input';
import { control } from 'react-validation';

class InputField extends Component {
  
  render() {
    return (
      <span>
        <p className="query-item query-tags">{this.props.queryType}</p>
        <input {...this.props} name={this.props.queryType} type="text" placeholder="Table name" className="query-item input-query"/>
      </span> 
    )
  }
}

export default control(InputField); 
