import React, { Component } from 'react'

class Table extends Component {

    renderTableHeader() {
      let header = Object.keys(this.props.tables.cars.data[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
    }

    renderTableData() {
      let values = this.props.tables.cars.data
      return values.map((value) => {
        return <td>{value}</td>
      })
    }

    render() {
      
      return (
        <div>
          <h1 id='title'>React Dynamic Table</h1>
          <table id='students'>
            <thead>
              <tr>
                <th>{Object.keys(this.props.tables)[0]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {this.renderTableHeader()}
              </tr>
              <tr>
                {this.renderTableData()}
              </tr>
            </tbody>
          </table>
        </div>
      )
   }
}

 export default Table