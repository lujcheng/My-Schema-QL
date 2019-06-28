import React, { Component } from 'react'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteToggle: true
    }
  }
  
  handleClick = (e) => {
		e.preventDefault();
		this.setState(prevState => ({
			deleteToggle: !prevState.deleteToggle
		}))
  }
  
  onDelete = (event, col) => {
    event.preventDefault();
    this.props.deleteRow(col, this.props.tableName)
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
        <th className="colSelected" key={Math.floor(Math.random() * 1000)}>
          <input 
            type="text" 
            defaultValue={key.toUpperCase()} 
            className="query-item input-query new-table-item" 
            onKeyDown={(evt) => this.onEnterHeader(evt, col)}
            />
        </th>)
      } else {
        return (
        <th className="" key={Math.floor(Math.random() * 1000)}>
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
    return data.map((items, col) => {
      if (this.props.table.selected.rowIndexes != null && this.props.table.selected.rowIndexes.includes(col)) {
      return (
        <tr key={Math.floor(Math.random() * 1000)} className="data-row rowSelected">

          {
            items.map((item, row) => {
              if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                return <td key={Math.floor(Math.random() * 1000)} className="colSelected" ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
              } else {
                return <td key={Math.floor(Math.random() * 1000)}><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
              }
            })
          }<td className={this.state.deleteToggle ? "delete-button" : null}><button type="button" className="button is-marginless is-paddingless is-pulled-right" onClick={(evt) => this.onDelete(evt, col)}><i className="far fa-trash-alt"></i></button></td>
        </tr>
      )

        } else {
          return ( 
              <tr key={Math.floor(Math.random() * 1000)} className="data-row">
              {
                items.map((item, row) => {
                  if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                    return <td key={Math.floor(Math.random() * 1000)} className="colSelected" ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
                  } else {
                    return <td key={Math.floor(Math.random() * 1000)} ><input type="text" defaultValue={item} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnter(evt, col, row)}/></td>
                  }
                })
              }<td className={this.state.deleteToggle ? "delete-button" : null}><button type="button" className="button is-marginless is-paddingless is-pulled-right" onClick={(evt) => this.onDelete(evt, col)}><i className="far fa-trash-alt"></i></button></td>
            </tr>
          )

        }
    })
  }
    render() {
      return (
        <div>
          <table className="schema-table animated infinite bounce delay-2s" border='1'>
            <thead className="table-title">
              <tr>
                <th colSpan={this.props.table.columns.length} className="has-text-centered table-title">
                  <input type="text" defaultValue={this.props.tableName} className="query-item input-query new-table-item" onKeyDown={(evt) => this.onEnterTitle(evt)}/>
                  <button type="button" className="button is-marginless is-paddingless is-pulled-right" onClick={this.handleClick}><i className="fas fa-edit"></i></button>
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