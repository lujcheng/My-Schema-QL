import React, { Component } from 'react'



class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteToggle: true
    }
  }
  focus = (e) => {
    e.stopPropagation()
    e.target.focus()
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
        <th className="colSelected header-row" key={key + col} onClick={(e) => {this.props.createSVG(e, this.props.tableName)}}>
          <input 
            type="text" 
            defaultValue={key.toUpperCase()} 
            className="input" 
            onKeyDown={(evt) => this.onEnterHeader(evt, col)}
            onDoubleClick={this.focus}
            top={`${this.props.y}px`} left={`${this.props.x}px`}
            />
        </th>)
      } else {
        return (
        <th key={key + col} onClick={(e) => {this.props.createSVG(e, this.props.tableName)}}>
          <input 
            type="text" 
            defaultValue={key.toUpperCase()} 
            className="input" 
            onKeyDown={(evt) => this.onEnterHeader(evt, col)} 
            onDoubleClick={this.focus}
             top={`${this.props.y}px`} left={`${this.props.x}px`}
            />
        </th>)
      }
    })
  }

  renderTableData() {
    let data = this.props.table.values
    if(this.props.table.selected.rowIndexes != null) {
      return data.map((items, col) => {
        if (this.props.table.selected.rowIndexes != null && this.props.table.selected.rowIndexes.includes(col)) {
          return (
            <tr key={items + col} className="data-row rowSelected" >
            {
              items.map((item, row) => {
                if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                  return <th key={item + col + row} className="colSelected" ><input type="text" defaultValue={item} className="input" onKeyDown={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus}/></th>
                } else {
                  return <th key={item + col 
                  + row}><input type="text" defaultValue={item} className="input" onKeyDown={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus}/></th>
                }
              })
            }<td className={this.state.deleteToggle ? "delete-button" : null}><button type="button" className="button is-marginless is-paddingless is-pulled-right" onClick={(evt) => this.onDelete(evt, col)}><i className="far fa-trash-alt"></i></button></td>
            </tr>
          )
        } else {
          return ( 
              <tr key={items + col} className="data-row">
              {
                items.map((item, row) => {
                  if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                    return <td key={item + col 
                    + row} className="colSelected" ><input type="text" defaultValue={item} className="input" onKeyDown={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus}/></td>
                  } else {
                    return <td key={item + col 
                    + row}><input type="text" defaultValue={item} className="input" onKeyDown={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus}/></td>
                  }
                })
              }<td className={this.state.deleteToggle ? "delete-button" : null}><button type="button" className="button is-marginless is-paddingless is-pulled-right is-dark is-normal" onClick={(evt) => this.onDelete(evt, col)}><i className="far fa-trash-alt"></i></button></td>
            </tr>
          )
        }
      })
    } else {
      return data.map((items, col) => {
        return ( 
            <tr key={items + col} className="data-row rowSelected">
            {
              items.map((item, row) => {
                if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                  return <td key={item + col 
                  + row} className="colSelected" ><input type="text" defaultValue={item} className="input" onKeyDown={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus}/></td>
                } else {
                  return <td key={item + col 
                  + row}><input type="text" defaultValue={item} className="input" onKeyDown={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus}/></td>
                }
              })
            }<td className={this.state.deleteToggle ? "delete-button" : null}><button type="button" className="button is-marginless is-paddingless is-pulled-right is-dark is-normal" onClick={(evt) => this.onDelete(evt, col)}><i className="far fa-trash-alt"></i></button></td>
          </tr>
        )
      })
    }
  }
    render() {
      return (
        <>
          <table className="table is-narrow is-borderless">
            <thead>
              <tr>
                <th colSpan={this.props.table.columns.length}>
                  <input type="text" defaultValue={this.props.tableName} className="input" onKeyDown={(evt) => this.onEnterTitle(evt)} onDoubleClick={this.focus}/>
                  <button type="button" className="button is-pulled-right is-dark is-normal" onClick={this.handleClick}><i className="fas fa-edit"></i></button>
                </th>
              </tr>
              <tr className="header-row">
                {this.renderTableHeader()}
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
           </table>
        </>
      )
   }
}

export default Table