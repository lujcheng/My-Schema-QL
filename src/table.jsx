import React, { Component } from 'react'

class Table extends Component {
  
  onEnter = (event, row, col) => {
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

  onEnterHeader = (event, col) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      let val = event.target.value;
      let tableName = this.props.tableName
      this.props.changeTableHeader(tableName, val, col);
    }
  }

  onEnterTitle = (event) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      let val = event.target.value;
      let tableName = this.props.tableName
      let tableID = this.props.tableID
      // console.log("VALUE", val)
      // console.log("TABLE NAME", tableName)
      // console.log("TABLE", this.props.table)
      // console.log("KEY", this.props.tabID)
      this.props.changeTableTitle(tableName, val, tableID);
    }
  }

  renderTableHeader() {
    let columnHeaders = this.props.table.columns
    return columnHeaders.map((key, col) => {
      if (this.props.table.selected.columnIndexes && this.props.table.selected.columnIndexes.includes(col)) {
        return (
        <th className="colSelected" key={col}>
          <input 
            type="text" 
            defaultValue={key.toUpperCase()} 
            className="query-item input-query new-table-item" 
            onKeyDown={(evt) => this.onEnterHeader(evt, col)}
            />
        </th>)
      } else {
        return (
        <th className="" key={col}>
          <input 
            type="text" 
            defaultValue={key.toUpperCase()} 
            className="query-item input-query new-table-item" 
            onKeyDown={(evt) => this.onEnterHeader(evt, col)} 
            />
        </th>)
      }
    })
  }

  renderTableData() {
    let data = this.props.table.values
    return data.map((value, col) => {
      let items = Object.values(value)
      if (this.props.table.selected.rowIndexes != null && this.props.table.selected.rowIndexes.includes(col)) {
      return ( 
        <tr key={col} className="data-row">
          {
            items.map((item, row) => {
              if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                return <td key={row} className="colSelected" ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
              } else {
                return <td key={row} ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
              }
            })
          }
        </tr>
      )
        } else {
          return ( 
            <tr key={col} className="data-row rowSelected">
              {
                items.map((item, row) => {
                  if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                    return <td key={row} className="colSelected" ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
                  } else {
                    return <td key={row} ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
                  }
                })
              }
            </tr>
          )

        }
    })
  }
    render() {
      return (
        <table className="schema-table" border='1'>
          <thead className="table-title">
            <tr>
              <th colSpan={this.props.table.columns.length} className="has-text-centered table-title">
                <input type="text" defaultValue={this.props.tableName} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnterTitle(evt)}/> 
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