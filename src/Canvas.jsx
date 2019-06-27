import React, { Component } from 'react'
import Table from "./table.jsx"
import Draggable from 'react-draggable';

class Canvas extends Component {
  
  deleteRow = (col, tableName) => {
    this.props.deleteRow(col, tableName)
  }

  renderTableChange = (tableName, val, col, row) => {
    this.props.renderTableChange(tableName, val, col, row)
  }

  changeTableHeader = (tableName, val, col) => {
    this.props.changeTableHeader(tableName, val, col)
  }

  changeTableTitle = (tableName, val, tableID) => {
    this.props.changeTableTitle(tableName, val, tableID)
  }

  render() {
    const tables = this.props.tables
    const renderTables = Object.keys(tables)
    .sort((a, b) => {
      if (tables[a].createdAt < tables[b].createdAt) {
        return 1
      } else {
        return -1
      }
    })
      .map((tableKey, index) => {
        const table = tables[tableKey]
        return (
          <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[5, 5]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div>
              <Table key={Math.floor(Math.random() * 1000)} tableID={index} tableName={tableKey} table={table} renderTableChange={this.renderTableChange} changeTableHeader={this.changeTableHeader} changeTableTitle={this.changeTableTitle} deleteRow={this.deleteRow}/>
            </div>
        </Draggable>)
        })

    return (
      <div>
        <main>{renderTables}</main>
      </div>
    )
  }
}

export default Canvas