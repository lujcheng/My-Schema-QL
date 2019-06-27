import React, { Component } from 'react'
import {spaces} from './validations.jsx'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import InputField from './inputField';

const keyWordToAllowedKeyWords = {
	'WHERE': ['JOIN','ORDER BY','GROUP BY', 'HAVING', 'AND' ],
	'JOIN': ['WHERE', 'JOIN', 'ORDER BY', 'GROUP BY', 'HAVING'],
	'ORDER BY': ['JOIN', 'GROUP BY', 'HAVING'],
	'AND': ['ORDER BY', 'GROUP BY', 'HAVING', 'AND'],
	'HAVING': ['WHERE', 'ORDER BY', 'GROUP BY', 'JOIN', 'AND'],
	'FROM': ['WHERE', 'JOIN', 'ORDER BY', 'GROUP BY', 'HAVING' ]
	}

class Query extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			inputFieldArr: [],
			lastKeyword: "FROM"
		}
		this.toggleDropdown = this.toggleDropdown.bind(this)
	}
	
	toggleDropdown = (lastKeyword) => {
		return keyWordToAllowedKeyWords[lastKeyword].map((keyword) => {
			return (
				<option className="dropdown-value" key={keyword} value={keyword}>{keyword}</option>
			)
		})
	}
	
	onButtonSubmit = (evt) => {
		evt.preventDefault()
		const tempArr = this.state.inputFieldArr;
		const queryType = evt.target.keywords.value;
		if (queryType === "JOIN") {
			tempArr.push(
				<div className="is-inline-block">
						<InputField queryType={queryType} onChange={(e) => this.props.onChange(e, queryType)}/>
						<InputField queryType="ON" onChange={(e) => this.props.onChange(e, "ON")}/>
				</div>
			)
		} else {
			tempArr.push(
				<div><InputField queryType={queryType} onChange={(e) => this.props.onChange(e, queryType)}/></div>
			)
		}
		this.setState({
			inputFieldArr: tempArr,
			lastKeyword: queryType
		})
	}
  
	render() {
		const printFields = this.state.inputFieldArr.map((field) => {
			return (
					<span>{field}</span>
			)
		})
		return (
			<Form action="" method="POST" className="sub-nav-elements" onSubmit={this.onButtonSubmit} >
				<p className="query-item query-tags">SELECT</p>
				<Input name="select" type="text" placeholder="" className="query-item input-query" onChange={(e) => this.props.onChange(e, "select")} />
				<p className="query-item query-tags">FROM</p>
				<Input name="from" type="text" placeholder="Table name" className="query-item input-query" onChange={(e) => this.props.onChange(e, "from")} validations={[spaces]} />
				{printFields}
				<select className="dropdown-box" name="keywords">
					{this.toggleDropdown(this.state.lastKeyword)}
				</select>
				<button type="submit" className="button add-button" >+</button>
			</Form>
    )
  }
}

export default Query