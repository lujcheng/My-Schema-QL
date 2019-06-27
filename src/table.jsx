import React, { Component } from 'react'


class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editToggle: false
    }
  }
  
  onDelete = (event, col) => {
    event.preventDefault();
    this.props.deleteRow(col, this.props.tableName)
  }

  handleMouseIn = (e) => {
    this.setState(prevState => ({
			editToggle: !prevState.editToggle
    }))
  }

  handleMouseOut = (e) => {
    this.setState(prevState => ({
			editToggle: !prevState.editToggle
    }))
  }
  
  onEnter = (event, col, row) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      let val = event.target.value;
      let tableName = this.props.tableName;
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
          <tr key={col} className="data-row rowSelected" onMouseEnter={this.handleMouseIn} onMouseLeave={this.handleMouseOut}>

            {
              items.map((item, row) => {
                if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                  return <td key={row} className="colSelected" ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
                } else {
                  return <td key={row}><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
                }
              })
            }<td><button type="button" className="button is-marginless is-paddingless is-pulled-right" onClick={(evt) => this.onDelete(evt, col)}><i class="far fa-trash-alt"></i></button></td>
          </tr>
        )
        } else {
          return ( 
              <tr key={col} className="data-row" onMouseEnter={this.handleMouseIn} onMouseLeave={this.handleMouseOut}>
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
        <div>
          <table className="schema-table" border='1'>
            <thead className="table-title">
              <tr>
                <th colSpan={this.props.table.columns.length} className="has-text-centered table-title">
                  <input type="text" defaultValue={this.props.tableName} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnterTitle(evt)}/>
                  <button type="button" className="button is-marginless is-paddingless is-pulled-right"><i className="fas fa-edit"></i></button>
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
        </div>
      )
   }
}

export default Table