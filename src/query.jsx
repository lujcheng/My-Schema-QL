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
				<><div className="control"><InputField queryType={queryType} onChange={(e) => this.props.onChange(e, queryType)}/></div>
				<div className="control"><InputField queryType={"on"} onChange={(e) => this.props.onChange(e, "on")}/></div></>
			)
		} else {
			tempArr.push(
				<div className="b control"><InputField queryType={queryType} onChange={(e) => this.props.onChange(e, queryType)}/></div>
			)
		}
		this.setState({inputFieldArr: tempArr})
	}
  
	render() {
		const printFields = this.state.inputFieldArr.map((field) => {
			return (
				<>
					{field}
				</>
			)
		})
		// Form - took out className "sub-nav-elements"
		return (
			<Form action="" method="POST" className="1" onSubmit={this.onButtonSubmit}>
				<div className="field is-grouped is-grouped-multiline">
					<div className="control">
						<label className="label">SELECT</label>
						<Input name="select" type="text" placeholder="" className="input" onChange={(e) => this.props.onChange(e, "select")} />
					</div>
					<div className="control">
						<label className="label">FROM</label>
						<Input name="from" type="text" placeholder="Table name" className="input" onChange={(e) => this.props.onChange(e, "from")} validations={[spaces]} />
					</div>
					{printFields}
				</div>
				{/* <div className="e level-item column">
					{printFields}
				</div> */}
				<div className="control">
					<div className="select" >
						<select name="keywords">
							<option className="dropdown-value" value="join">JOIN</option>
							<option className="dropdown-value" value="on">ON</option>
							<option className="dropdown-value" value="where">WHERE</option>
						</select>
					</div>
					<button type="submit" className="button is-normal is-dark" >+</button>
				</div>
			</Form>
    )
  }
}

export default Query