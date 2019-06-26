import React, { Component } from 'react'
import {spaces} from './validations.jsx'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import InputField from './inputField'



class Query extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			inputFieldArr: []
		}
	}
	
	onButtonSubmit = (evt) => {
		evt.preventDefault()
		const tempArr = this.state.inputFieldArr;
		const queryType = evt.target.keywords.value
		if (queryType === "join") {
			tempArr.push(
				<div><InputField queryType={queryType} onChange={(e) => this.props.onChange(e, queryType)}/>
				<InputField queryType={"on"} onChange={(e) => this.props.onChange(e, "on")}/></div>
			)
		} else {
			tempArr.push(
				<div><InputField queryType={queryType} onChange={(e) => this.props.onChange(e, queryType)}/></div>
			)
		}
		this.setState({inputFieldArr: tempArr})
	}
  
	render() {
		const printFields = this.state.inputFieldArr.map((field) => {
			return (
				<div>
					{field}
				</div>
			)
		})
		return (
			<Form action="" method="POST" className="sub-nav-elements" onSubmit={this.onButtonSubmit} >
				<p className="query-item query-tags">SELECT</p>
				<Input name="select" type="text" placeholder="" className="query-item input-query" onChange={(e) => this.props.onChange(e, "select")} />
				<p className="query-item query-tags">FROM</p>
				<Input name="from" type="text" placeholder="Table name" className="query-item input-query" onChange={(e) => this.props.onChange(e, "from")} validations={[spaces]} />
				<div>
					{printFields}
				</div>
				<select className="dropdown-box" name="keywords">
					<option className="dropdown-value" value="join">JOIN</option>
					<option className="dropdown-value" value="on">ON</option>
					<option className="dropdown-value" value="where">WHERE</option>
				</select>
				<button type="submit" className="button add-button" >+</button>
			</Form>
    )
  }
}

export default Query