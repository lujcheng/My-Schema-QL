import React, { Component } from 'react'

class Query extends Component {


    render() {
   
      return (
				<nav id="sub-nav-bar">
					<form action="" method="POST" className="sub-nav-elements">
						<p className="query-item query-tags">SELECT</p>
						<input name="select" type="text" placeholder="*" className="query-item input-query" onChange={(e) => this.props.onChange(e, "select")} />
						<p className="query-item query-tags">FROM</p>
						<input name="from" type="text" placeholder="Table name" className="query-item input-query" onChange={(e) => this.props.onChange(e, "from")} />
						<select className="dropdown-box">
								<option value="join">JOIN</option>
								<option value="on">ON</option>
								<option value="where">WHERE</option>
							</select>
						<button type="submit" className="button add-button">+</button>
					</form>
				</nav>
      )
   }
}

 export default Query