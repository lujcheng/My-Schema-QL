import React, { Component } from 'react'
import Table from "./table.jsx"

class Canvas extends Component {
//   console.log("canvas props", this.props)
  render() {
    const tables = this.props.tables
    console.log("canvas props", tables)
    const renderTables = Object.keys(this.props.tables)
        .map((tableKey, index) => {
            const table = tables[tableKey]
            console.log("canvas props", table)
            return (<Table key={index} tableName={tableKey} table={table}/>)
        })

    return (
      <div>
        <main>{renderTables}</main>
      </div>
    )
  }
}

export default Canvas