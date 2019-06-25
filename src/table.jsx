import React, { Component } from 'react'

class Table extends Component {
  
  onEnter = (event, col, row) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      let val = event.target.value;
      let tableName = this.props.tableName;
      console.log("table", this.props.tableName)
      console.log("COL", col)
      console.log('ROW', row)
      console.log("New value:", val)
      this.props.renderTableChange(tableName, val, col, row);
    }
  };

  renderTableHeader() {
    let columnHeaders = this.props.table.columns
    return columnHeaders.map((key, index) => {
      if (this.props.table.selected.columnIndexes && this.props.table.selected.columnIndexes.includes(index)) {
        return <th className="handle colSelected" key={index}><input type="text" defaultValue={key.toUpperCase()} className="query-item input-query new-table-item" onKeyDown={this.onEnter}/></th>
      } else {
        return <th className="handle" key={index}><input type="text" defaultValue={key.toUpperCase()} className="query-item input-query new-table-item" onKeyDown={this.onEnter} /></th>
      }
    })
  }

  renderTableData() {
    let data = this.props.table.values
    return data.map((value, row) => {
      let items = Object.values(value)
      return (
        <tr key={row} className="data-row">
          {
            items.map((item, col) => {
              if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                return <td key={col} className="colSelected" ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
              } else {
                return <td key={col} ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
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
              <th colSpan={this.props.table.columns.length} className="has-text-centered table-title handle">
                <input type="text" defaultValue={this.props.tableName} className="query-item input-query new-table-item" onKeyDown={this.onEnter}/> 
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