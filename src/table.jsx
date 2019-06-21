import React, { Component } from 'react'

class Table extends Component {

  renderTableHeader() {
    debugger;
    // console.log("this.props ", this.props)
    let header = Object.keys(this.props.table.data[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    let data = this.props.table.data
    return data.map((value, index) => {
      let items = Object.values(value)
      return (
        <tr key={index} className="data-row">
          {
            items.map((item, index) => {
              return <td key={index} >{item}</td>
            })
          }
        </tr>
      )
    })
  }
    render() {
      
      return (
        <table className="schema-table" border='1'>
          <thead className="table-title">
            <tr>
              <th colSpan="4" className="has-text-centered table-title">
                {this.props.tableName}
              </th>
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