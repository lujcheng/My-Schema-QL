import React, { Component } from 'react'
import {required, email} from './validations.js'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';



class Query extends Component {
    
		render() {
   
      return (
					// <nav id="sub-nav-bar">
						<Form action="" method="POST" className="sub-nav-elements">
							<p className="query-item query-tags">SELECT</p>
							<Input name="select" type="text" placeholder="" className="query-item input-query" onChange={(e) => this.props.onChange(e, "select")} validations={[required, email]} />
							<p className="query-item query-tags">FROM</p>
							<input name="from" type="text" placeholder="Table name" className="query-item input-query" onChange={(e) => this.props.onChange(e, "from")} />
							<select className="dropdown-box">
									<option value="join">JOIN</option>
									<option value="on">ON</option>
									<option value="where">WHERE</option>
								</select>
							<button type="submit" className="button add-button">+</button>
						</Form>
					// </nav>
      )
   }
}

 export default Query