import React, { Component } from 'react'

class Table extends Component {

  renderTableHeader() {
    let header = Object.keys(this.props.tables.cars.data[0])
    console.log("header ", header)
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    let data = this.props.tables.cars.data
    return data.map((value, index) => {
    let items = Object.values(value)
      return <tr key={index} className="data-row">{items.map((item, index) => {
        return <td key={index} >{item}</td>
        })
      }</tr>
    })
  }
    render() {
      
      return (
        <table className="schema-table" border='1'>
          <thead className="table-title">
            <tr>
              <th colSpan="3" className="has-text-centered table-title">{Object.keys(this.props.tables)[0]}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="header-row">
              {this.renderTableHeader()}
            </tr>
              {this.renderTableData()}
          </tbody>
        </table>
      )
   }
}

 export default Table