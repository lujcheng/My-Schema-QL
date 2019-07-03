import React, { Component } from 'react'



class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteToggle: true
    }
  }

  getWidth = () => {
    let cols = this.props.table.columns;
    let vals = this.props.table.values;
    let widths = []
    let longestWord = 1;
    for (let j = 0; j < cols.length; j++) {
      for (let k = 0; k < vals.length; k ++) {
        if (!vals[k][j]) {
          longestWord = 5;
        } else if (vals[k][j].length >= longestWord) {
          longestWord = vals[k][j].length
        }
      }
      if (cols[j].length >= longestWord) {
        longestWord = cols[j].length;
      }
      widths.push(longestWord + 1)
      longestWord = 1;
    }
    return widths
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
    event.preventDefault();
    let val = event.target.value;
    let tableName = this.props.tableName;
    this.props.renderTableChange(tableName, val, col, row);
  };

  onEnterHeader = (event, col) => {
    event.preventDefault();
    let val = event.target.value;
    let tableName = this.props.tableName
    this.props.changeTableHeader(tableName, val, col);
  }

  onEnterTitle = (event) => {
    event.preventDefault();
    let val = event.target.value;
    let tableName = this.props.tableName
    let tableID = this.props.tableID
    this.props.changeTableTitle(tableName, val, tableID);
  }

  renderTableHeader() {
    let columnHeaders = this.props.table.columns
    return columnHeaders.map((key, col) => {
      let colWidth = this.getWidth()
      return (
        <th className={this.props.table.selected.columnIndexes && this.props.table.selected.columnIndexes.includes(col) ? "colSelected" : null} key={key + col} onClick={(e) => {this.props.createSVG(e, this.props.tableName)}}style={{width: `${colWidth[col]}em`}} >
          <input 
            type="text" 
            defaultValue={key}
            className="input" 
            onBlur={(evt) => this.onEnterHeader(evt, col)}
            onDoubleClick={this.focus}
            top={`${this.props.y}px`} left={`${this.props.x}px`}
            style={{width: `${colWidth[col]}em`}}
            />
        </th>
      )
    })
  }

  renderTableData() {
    let data = this.props.table.values
    if(this.props.table.selected.rowIndexes != null) {
      return data.map((items, col) => {
        if (this.props.table.selected.rowIndexes != null && this.props.table.selected.rowIndexes.includes(col)) {
          return (
            <tr key={items + col} className="rowSelected" >
            {
              items.map((item, row) => {
                let colWidth = this.getWidth()
                if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                  return <td key={item + col + row} className="colSelected" style={{width: `${colWidth[row]}em`}}><input type="text" defaultValue={item} className="input" onBlur={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus} style={{width: `${colWidth[row]}em`}}/></td>
                } else {
                  return <td key={item + col 
                  + row} style={{width: `${colWidth[row]}em`}}><input type="text" defaultValue={item} className="input" onBlur={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus} style={{width: `${colWidth[row]}em`}}/></td>
                }
              })
            }<td className={this.state.deleteToggle ? "delete-button" : null}><button type="button" className="button is-marginless is-paddingless is-pulled-right" onClick={(evt) => this.onDelete(evt, col)}><i className="far fa-trash-alt"></i></button></td>
            </tr>
          )
        } else {
          return ( 
              <tr key={items + col}>
              {
                items.map((item, row) => {
                  let colWidth = this.getWidth()
                  if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                    return <td key={item + col 
                    + row} className="colSelected" style={{width: `${colWidth[row]}em`}}><input type="text" defaultValue={item} className="input" onBlur={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus} style={{width: `${colWidth[row]}em`}}/></td>
                  } else {
                    return <td key={item + col 
                    + row} style={{width: `${colWidth[row]}em`}}><input type="text" defaultValue={item} className="input" onBlur={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus} style={{width: `${colWidth[row]}em`}}/></td>
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
            <tr key={items + col} className="rowSelected">
            {
              items.map((item, row) => {
                let colWidth = this.getWidth()
                if (this.props.table.selected.columnIndexes != null && this.props.table.selected.columnIndexes.includes(row)) {
                  return <td key={item + col 
                  + row} className="colSelected" style={{width: `${colWidth[row]}em`}}><input type="text" defaultValue={item} className="input" onBlur={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus} style={{width: `${colWidth[row]}em`}}/></td>
                } else {
                  return <td key={item + col 
                  + row} style={{width: `${colWidth[row]}em`}} ><input type="text" defaultValue={item} className="input" onBlur={(evt) => this.onEnter(evt, col, row)} onDoubleClick={this.focus} style={{width: `${colWidth[row]}em`}}/></td>
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
                  <input type="text" defaultValue={this.props.tableName} className="input" onBlur={(evt) => this.onEnterTitle(evt)} onDoubleClick={this.focus}/>
                  <button type="button" className="button is-pulled-right is-dark is-normal" onClick={this.handleClick}><i className="fas fa-edit"></i></button>
                </th>
              </tr>
              <tr>
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