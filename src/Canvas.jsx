import React, { Component } from 'react'
import Table from "./table.jsx"
import Draggable from 'react-draggable';

class Canvas extends Component {
  render() {
    const tables = this.props.tables
    const renderTables = Object.keys(this.props.tables)
      .map((tableKey, index) => {
        const table = tables[tableKey]
        return (
          <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div>
              <Table key={index} tableName={tableKey} table={table}/>
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