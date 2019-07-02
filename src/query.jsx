import React, { Component } from 'react'
import {spaces , where, required} from './validations.jsx'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

const keyWordToAllowedKeyWords = {
	'SELECT': ['FROM'],
	'WHERE': ['JOIN','ORDER BY','GROUP BY', 'HAVING', 'AND' ],
	'JOIN': ['WHERE', 'JOIN', 'ORDER BY', 'GROUP BY', 'HAVING'],
	'ORDER BY': ['JOIN', 'GROUP BY', 'HAVING'],
	'AND': ['ORDER BY', 'GROUP BY', 'HAVING', 'AND'],
	'HAVING': ['WHERE', 'ORDER BY', 'GROUP BY', 'JOIN', 'AND'],
  'FROM': ['WHERE', 'JOIN', 'ORDER BY', 'GROUP BY', 'HAVING' ],
  'GROUP BY': ['WHERE', 'JOIN', 'HAVING']
}

// const validationsForKeywords = {
//   'WHERE': [required, where],
//   'JOIN': [required, spaces],
//   'ORDER BY': [required]
//   'AND': [required]
// }

class Query extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			inputFieldArr: [],
			lastKeyword: "SELECT",
			queryArray: []
		}
		this.toggleDropdown = this.toggleDropdown.bind(this)
	}

	printQuery = () => {
		let lastKeyword = this.state.lastKeyword
		let queryArr = [];
		queryArr.push(lastKeyword)
		queryArr.push(this.props.query[lastKeyword.toLowerCase()]);
		let queryString = queryArr;
		this.setState({queryArray: [...this.state.queryArray, queryString]})
		// return <p>{this.state.queryArray}</p>
	}
	
	deleteInputFields = (evt) => {
		evt.preventDefault();
		this.setState({
      inputFieldArr: []
    })
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
		this.printQuery();
		setTimeout(() => {
      let data = this.state.queryArray;
      this.props.socket.emit('query-string', data);
    }, 50);

		const tempArr = this.state.inputFieldArr;
    const queryType = evt.target.keywords.value;
    console.log("querytype ", queryType);
		if (queryType === "JOIN") {
			tempArr.push(
				<>
					<div className="field is-grouped is-grouped-multiline">
						<div className="field-label is-normal">
							<label className="label">JOIN</label>
						</div>
						<div className="control">
							<Input name="JOIN" type="text" className="input" onChange={(e) => this.props.onChange(e, "join")} validations={[spaces, required]}/>
						</div>
					</div>
					
					<div className="field is-grouped is-grouped-multiline">
						<div className="field-label is-normal">
							<label className="label">ON</label>
						</div>
						<div className="control">
							<Input name="ON" type="text" className="input" onChange={(e) => this.props.onChange(e, "on")} validations={[spaces, required]} />
						</div>
        			</div>
				</>
			)
		} 
		else if (queryType === "WHERE") {
      tempArr.push(
      <>
	  	<div className="field is-grouped is-grouped-multiline">	
		  	<div className="field-label is-normal">
				<label className="label">WHERE</label>
			</div>
			<div className="control">
				<Input name="WHERE" type="text" className="input" onChange={(e) => this.props.onChange(e, "where")} validations={[where, required]}/>
			</div>
		</div>
      </>
			)	
		} else if (queryType === "FROM") {
      tempArr.push(
      <>
	  	<div className="field is-grouped is-grouped-multiline">	
		  	<div className="field-label is-normal">
				<label className="label">FROM</label>
			</div>
			<div className="control">
				<Input name="FROM" type="text" className="input" onChange={(e) => this.props.onChange(e, "from")} validations={[required]}/>
			</div>
		</div>
      </>
			)	
		}	else {
			tempArr.push(
				<>
					<div className="field is-grouped is-grouped-multiline">	
						<div className="field-label is-normal">
         					 <label className="label">{queryType}</label>
						</div>
						<div className="control">
          					<Input name="JOIN" type="text" className="input" onChange={(e) => this.props.onChange(e, queryType)} validations={[spaces]}/>
						</div>
					</div>
        		</>
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
				<>
					{field}
				</>
			)
		})
		return (
			<div className="box">
				<Form action="" method="POST" onSubmit={this.onButtonSubmit} >
					<div className="field is-grouped is-grouped-multiline">
						<div className="field is-grouped is-grouped-multiline">
							<div className="field-label is-normal">
								<label className="label">SELECT</label>
							</div>
							<div className="control">
								<Input name="select" type="text" className="input" onChange={(e) => this.props.onChange(e, "select")} validations={[required]}/>
							</div>
						</div>
						{/* <div className="field is-grouped is-grouped-multiline">
							<div className="field-label is-normal">
								<label className="label">FROM</label>
							</div>
							<div className="control">
								<Input name="from" type="text" className="input" onChange={(e) => this.props.onChange(e, "from")} validations={[required, spaces]} />
							</div>
						</div> */}
						{printFields}
						<div className="field is-grouped is-grouped-multiline">
							<div className="control">
								<div className="select">
									<select name="keywords">
										{this.toggleDropdown(this.state.lastKeyword)}
									</select>
								</div>	
								<button type="submit" className="button is-normal is-dark" >+</button>
								<button type="button" className="button is-paddingless is-pulled-right is-dark is-normal" onClick={(evt) => this.deleteInputFields(evt)}><i className="far fa-trash-alt"></i></button>
							</div>
						</div>
					</div>
				</Form>
				{/* <p>{this.state.queryArray}</p> */}
			</div>
    )
  }
}

export default Query