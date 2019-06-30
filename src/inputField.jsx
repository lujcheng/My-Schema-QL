import React, { Component } from 'react'
import Input from 'react-validation/build/input';
import { control , where} from 'react-validation';

class InputField extends Component {
  
  render() {
    return (
      <>
      <div className="field is-grouped is-grouped-multiline">
       <div className="field-label is normal">
          <label className="label e">{this.props.queryType}</label>
        </div>
        <div className="control">
          <input {...this.props} name={this.props.queryType} type="text" placeholder="Table name" className="f input"/>
        </div>
      </div>
      </> 
    )
  }
}

export default control(InputField); 
