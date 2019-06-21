import React, { Component } from 'react'

class Query extends Component {

    // renderTableHeader() {
    //   let header = Object.keys(this.props.tables.cars.data[0])
    //   return header.map((key, index) => {
    //      return <th key={index}>{key.toUpperCase()}</th>
    //   })
    // }

    // renderTableData() {
    //   let values = this.props.tables.cars.data
    //   return values.map((value) => {
    //     return <td>{value}</td>
    //   })
    // }

    render() {
      this.change = (event) => {
				console.log(this.props.onChange)
			}
      return (
				<nav id="sub-nav-bar">
					<form action="" method="POST" className="sub-nav-elements">
						<p className="query-item query-tags">SELECT</p>
						<input name="select" type="text" placeholder="*" className="query-item input-query" onChange={this.props.onChange} />
						<p className="query-item query-tags">FROM</p>
						<input name="from" type="text" placeholder="Table name" className="query-item input-query" onChange={this.props.onChange} />
						<select className="dropdown-box">
								<option value="join">JOIN</option>
								<option value="on">ON</option>
								<option value="where">WHERE</option>
							</select>
						<button type="submit" className="button add-button">+</button>
					</form>
					<form action="" method="POST">
						<button type="submit" className="button create-table-button"><i className="fas fa-table"></i>Create Table</button>
					</form>
				</nav>
      )
   }
}

 export default Query