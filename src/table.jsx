import React, { Component } from 'react'

class Table extends Component {

  renderTableHeader() {
    console.log("hopefully not null", this.props.table)
    let columnHeaders = this.props.table.columns
    return columnHeaders.map((key, index) => {
      if (this.props.table.selected.columnIndexes && this.props.table.selected.columnIndexes.includes(index)) {
        return <th className="handle colSelected" key={index}>{key.toUpperCase()}</th>
      } else {
        return <th className="handle" key={index}>{key.toUpperCase()}</th>
      }
    })
  }

  renderTableData() {
    let data = this.props.table.values
    return data.map((value, index) => {
      let items = Object.values(value)
      return (
        <tr key={index} className="data-row">
          {
            items.map((item, index) => {
              if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(index)) {
                return <td key={index} className="colSelected" >{item}</td>
              } else {
                return <td key={index} >{item}</td>
              }
            })
          }
        </tr>
      )
    })
  }
    render() {
      
      return (
        <table className="schema-table" border='1'>
          <thead className="table-title handle">
            <tr>
              <th colSpan="4" className="has-text-centered table-title handle">
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