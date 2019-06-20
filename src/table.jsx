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
        return data.map((value) => {
          let items = Object.values(value)
            
            return <tr className="data-row">{items.map((item) => {
              return <td>{item}</td>
          })
        } </tr>
        })
      }

    render() {
      
      return (
        <div>
          <table className="schema-table" border='1'>
            <thead>
              <tr>
                <th colspan="5" className="table-title">{Object.keys(this.props.tables)[0]}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="header-row">
                {this.renderTableHeader()}
              </tr>
                {this.renderTableData()}
            </tbody>
          </table>
        </div>
      )
   }
}

 export default Table