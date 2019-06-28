import React, { Component } from 'react';
import './App.css';
import './styles.css';
import MyCanvas from './Canvas.jsx';
import Query from './query.jsx';
import NewTable from './new-table.jsx'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      join: false,
      colMatch: false,
      rowMatch: false,
      currentTable: null,
      user: "1",
      query: {
        select: null,
        from: null,
        join: null,
        where: null,
        on: null,
      },
      tables: {
        cars: {
          
          columns: ['ID', 'make', 'model', 'year'],
          values: [
            ['1', 'VW', 'Jetta', '2010'],
            ["2", 'Ford', 'Fiesta', '2015'],
            ["3", 'Chevy', 'Blazer', '2000'],
            ["4", 'Honda', 'Accord', '1978']
          ],
          createdAt: new Date('January 1, 2019 00:01:00'),
          foreignKey: null,
          xY: null,
          selected: {
            columnIndexes: null,
            rowIndexes: null
          }
        },
          
        guitars: {
          columns: ['ID', 'make', 'model', 'year'],
          values: [
            ["1", 'Fender', 'Tele', '2010'],
            ["2", 'Gibson', 'SG', '2015'],
            ["3", 'Guild', 'Starfire', '2001'],
            [ "4", 'Gretsch', 'Jet', '2005']
          ],
          createdAt: new Date('January 1, 2019 00:02:00'),
          foreignKey: null,
          xY: null,
          selected: {
            columnIndexes: null,
            rowIndexes: null
          }
        },

        dogs: {
          columns: ['ID', 'name', 'breed', 'age'],
          values: [
            ["1", 'Enfys', 'Husky', '12'],
            ["2", 'Jack', 'Pitbull', '15'],
            ["3", 'Charlie', 'Poodle', '21'],
            [ "4", 'Maple', 'Golden Doodle', '56']
          ],
          createdAt: new Date('January 1, 2019 00:03:00'),
          foreignKey: null,
          xY: null,
          selected: {
            columnIndexes: null,
            rowIndexes: null
          }
        }
    }
  }
    this.onChange = this.onChange.bind(this)
    this.select = this.select.bind(this)
    this.checkMatch = this.checkMatch.bind(this)
    this.join = this.join.bind(this)
    this.createTable = this.createTable.bind(this)
    this.changeTableTitle = this.changeTableTitle.bind(this)
    this.where = this.where.bind(this)
    this.checkTableMatches = this.checkTableMatches.bind(this)
    this.findRows = this.findRows.bind(this)
    this.handleCurrentTable = this.handleCurrentTable.bind(this)
  }
  checkTableMatches = () => {
    const query = this.state.query
    let currentTables = []
    let theTable
    // look at from
    if ('from' in query && typeof query.from === 'string') {
      let fromTables = query.from.split(/[ ,]+/)
      fromTables.forEach((table) => {
        if (Object.keys(this.state.tables).includes(table)) {
          currentTables.push(table)
        }
      })
    }
    // look at join
    if ('join' in query && typeof query.join === 'string') {
      let joinTables = query.join.split(/[ ,]+/)
      joinTables.forEach((table) => {
      if(Object.keys(this.state.tables).includes(table)) {
          currentTables.push(table)
        } 
      })
      if (currentTables.length > 1) {
        this.setState({join: true})
      } else {
        this.setState({join: false})
      }
    }
    console.log(currentTables)
    this.setState({currentTable: currentTables})
    // should set the list of tables joined in currentTables
    return currentTables
  }

  handleCurrentTable = () => {
    if (this.state.currentTable.length > 1 && typeof this.state.query.on === 'string') {
      let currentTables = this.state.currentTable
      let innerTable = this.state.currentTable[0]
      let innerOnStatement = this.state.query.on
      innerOnStatement = innerOnStatement.split(/[=]+/).filter((e) => {if(e != "=") {return e}})
      for (let i=1; i < currentTables.length; i++) {
        this.join([innerTable, currentTables[i]], innerOnStatement)
        innerTable = this.join([innerTable, currentTables[i]], innerOnStatement)
      }
      console.log("inner table", innerTable)
    } else {
      console.log("table", this.state.currentTable[0])
    }
  }

  findRows = (table) => {
    if (table != null) {
      let query = this.state.query
      if ("where" in query && typeof query.where === 'string') {
        let selectedIndexes = this.where(table, query.where)
        if (selectedIndexes) {
          this.setState(prevState => ({
            ...prevState, tables: {
              ...prevState.tables, [table]: { 
                ...prevState.tables[table], selected: {
                  ...prevState.tables[table].selected, rowIndexes: selectedIndexes
                }
              }
            }
          }))
          this.setState({rowMatch: true})
        } else {
          this.setState({rowMatch: false})
        }  
      }
    }
  }

  createTable = (tableName, colArray, dataArray) => {
    this.setState({
      tables: {
        ...this.state.tables,
        [tableName]: {
          columns: colArray, 
          values: dataArray, 
          createdAt: new Date(),
          foreignKey: null, 
          xY: null, 
          selected: {
            columnIndexes: null,
            rowIndexes: null
          }
        }
      }
    })
  }

  join = (tables, keys) => {
    if (Object.keys(this.state.tables).includes(tables[0]) && Object.keys(this.state.tables).includes(tables[1])) {
      let stateTbl = this.state.tables
      let joinColumns = []
      let joinValues = []
      let forKey = stateTbl[tables[0]].columns.indexOf(keys[0])
      let primeKey = stateTbl[tables[1]].columns.indexOf(keys[1])
      joinColumns = stateTbl[tables[0]].columns.concat(stateTbl[tables[1]].columns)
      for (let i=0; i < stateTbl[tables[0]].values.length; i++) {
        for (let e=0; e< stateTbl[tables[1]].values.length; e++) {
          console.log("hi!!!: ", stateTbl[tables[0]].values[i][forKey],stateTbl[tables[1]].values[e][primeKey])
          if(stateTbl[tables[0]].values[i][forKey] === stateTbl[tables[1]].values[e][primeKey] ) {
            joinValues[i] = stateTbl[tables[0]].values[i].concat(stateTbl[tables[1]].values[e])
          }
        }
      }
      this.createTable(`${tables[0]}_${tables[1]}`, joinColumns, joinValues)
      this.setState({joinTable: `${tables[0]}_${tables[1]}` })
      this.setState({join: true})
      return `${tables[0]}_${tables[1]}`
    } else {
      this.setState({join: false })
    }
  }
  
  /*
---------------------------------------------------

********** JOIN BASED ONE TWO TABLE NAMES, FOREIGN KEY SET IN STATE
  const join = (tables) => {
    stateTbl = state.tables
    let joinColumns = stateTbl[tables[0]].columns
    let joinValues = stateTbl[tables[0]].values
    let forKey
    let primeKey
    for(let tbl=1; tbl < tables.length; tbl++) {
      forKey = stateTbl[tables[tbl-1]].columns.indexOf(stateTbl[tables[tbl-1]].foreignKey)
      primeKey = stateTbl[tables[tbl]].columns.indexOf(stateTbl[tables[tbl]].primaryKey)
      console.log(forKey,primeKey)
      joinColumns = joinColumns.concat(state.tables[tables[tbl]].columns)
      for (let i=0; i < joinValues.length; i++) {
        for (let e=0; e< state.tables[tables[tbl]].values.length; e++) {
        if(joinValues[i][forKey] === state.tables[tables[tbl]].values[e][primeKey] )
        joinValues[i] = joinValues[i].concat(state.tables[tables[tbl]].values[e])
        }
      }
    }
    console.log(joinValues)
    // for each table
    // find table values
    // find columns
    // find values
    // join column and values to central table
  }

   */

  checkMatch = () => {
    if (this.state.colMatch === false) {
      console.log("hi cm")
      Object.keys(this.state.tables).forEach((table) => {
        this.setState(prevState => ({
          ...prevState, tables: {
            ...prevState.tables, [table]: { 
              ...prevState.tables[table], selected: {
                ...prevState.tables[table].selected, columnIndexes: null
              }
            }
          }
        }))
      })
    } 
    if (this.state.rowMatch === false) {
      Object.keys(this.state.tables).forEach((table) => {
        this.setState(prevState => ({
          ...prevState, tables: {
            ...prevState.tables, [table]: { 
              ...prevState.tables[table], selected: {
                ...prevState.tables[table].selected, rowIndexes: null
              }
            }
          }
        }))
      })
    } 
  }

  where = (tableName, input) => {
    // based on selected columns
    // query = "id > 3"
    let query = input.split(/[ ,]+/).filter(el => el != "")
    // expected output = ["id", ">", "3"]

    const operate = {
      '<': (a, b) => {return a < b},
      '>': (a, b) => {return a > b},
      '=': (a, b) => {return a == b}
    }
    // determine the column index
    console.log("query.lenght", query)
    if (query.length >= 3) {
      let colIndex = this.state.tables[tableName].columns.indexOf(query[0])
      // loop through row values at column index
      if (colIndex >= 0) {
        return this.state.tables[tableName].values.map((row, index) => {
          if (Object.keys(operate).includes(query[1]) && operate[query[1]] (row[colIndex], query[2])) {
            console.log(row[colIndex], query[1], query[2], "index", index)
            return index
          }
        }).filter(el => el != null)
        // expected output = [..row index, row index]
      }
    }
  }

  select = (currentTable) => {
  
    let query = this.state.query
    let columns = null
    let table = currentTable
    const search = {}
    // check for values in query, set new data structure
    if ('select' in query && typeof query.select === 'string') {
      columns = query.select.split(/[ ,]+/)
    }
    // check for column
    let columnIndexes = null
    // look for indexes based on
    if (columns && Object.keys(this.state.tables).includes(table)) {
      if (columns[0] === '*') {
        this.setState({colMatch: true})
        columnIndexes = Object.keys(this.state.tables[table].columns).toString()
      } else {
        columnIndexes = columns.map(column => {
          if (this.state.tables[table].columns.indexOf(column) >= 0) {
            this.setState({colMatch: true})
            return this.state.tables[table].columns.indexOf(column)
        } else {
          return null
        }
      })
    }
    } else {
      this.setState({colMatch: false})
    }
    console.log("query.from?!?!?", columnIndexes)
    if (columnIndexes && Object.keys(this.state.tables).includes(table)) {
      this.setState(prevState => ({
        ...prevState, tables: {
          ...prevState.tables, [table]: { 
            ...prevState.tables[table], selected: {
              ...prevState.tables[table].selected, columnIndexes: columnIndexes
            }
          }
        }
      }))
    } 
  }
    // let query = columns.filter((values, index, column) => column.indexOf(values) === input)
    // console.log(this.state.query.tables)
  
  
  onChange = (event, args) => {
    const state = () => {
      return new Promise ((resolve, reject) => {
        this.setState({ query: {...this.state.query, [args]: event.target.value}}, resolve)
      })
    }
      state()
      .then(() => {
        this.checkTableMatches()
      })
      .then(() => {
        if (this.state.join && this.state.currentTable.length > 1) {
          this.handleCurrentTable()
        }
      })
      .then(() => {
        if (this.state.join === true && Object.keys(this.state.tables).includes(this.state.joinTable)) {
          this.select(this.state.joinTable)
          this.findRows(this.state.joinTable)
        } else {
          this.select(this.state.currentTable[0])
          this.findRows(this.state.currentTable[0])
        }
      })
      .then(() => {
        this.checkMatch()
      })
  }
  
  renderTableChange = (tableName, val, row, col) => {
    const tabName = tableName;
    const value = val;
    const colNum = col;
    const rowNum = row;
    const tempTables = this.state.tables;
    let tempRow = tempTables[tabName].values[rowNum];
    tempRow[colNum] = value
    tempTables[tabName].values[rowNum] = tempRow
    this.setState({
      tables: tempTables
    })
  
  }


  deleteRow = (col, tableName) => {
    console.log("COL", col)
    const tabName = tableName;
    console.log(this.state.tables[tabName].values)
    const rowDelete = this.state.tables[tabName].values.filter((value, index) => {
      console.log("VALUE", value)
      if (index !== col) {
        console.log("IN HERE")
        return value
      }
    })
    console.log("ROW DELETE", rowDelete)
    const tempTables = this.state.tables
    tempTables[tabName].values = rowDelete
    this.setState({
      tables: tempTables
    })
  }

  changeTableHeader = (tableName, val, col) => {
    const tabName = tableName;
    const value = val;
    const colNum = col;
    const tempTables = this.state.tables;
    tempTables[tabName].columns[colNum] = value;
    this.setState({
      tables: tempTables
    })
  }

  changeTableTitle = (tableName, val, tableID) => {
    const oldTableName = tableName;
    const newTableName = val;
    const tabID = tableID;
    const tables = this.state.tables;
    tables[newTableName] = tables[oldTableName];
    this.setState({
      tables: tables
    })
    delete tables[oldTableName];
  }


  renderNewTable = (tableObj) => {
    const tableName = tableObj.tableName;
    const cols = tableObj.cols;
    const rows = tableObj.rows;
    
    const colArray = () => {
      let colArray = [];
      for (let i = 0; i < cols; i ++) {
        colArray.push("")
      }

      return colArray;
    }

    const dataArray = () => {
      let rowArray = [];
      for (let j = 0; j < rows; j ++) {
        let dataArray = []
        for (let i = 0; i < cols; i ++) {
          dataArray.push(null)
        }
        rowArray.push(dataArray)
      }

      return rowArray;
    }
    // const tables = this.state.tables
    // tables[tableName]:
    this.setState({
      tables: {
        ...this.state.tables,
        [tableName]: {
          columns: colArray(), 
          values: dataArray(),
          createdAt: new Date(),
          foreignKey: null, 
          xY: null, 
          selected: {
            columnIndexes: null,
            rowIndexes: null
          }
        }
      }
    })
  }
  render() {
    return (
      <div>
        <header>
		      <nav className="hero">
			      <div>
				      <h1>SCHEMA</h1>
              <NewTable renderNewTable={this.renderNewTable} />
			      </div>
		      </nav>
        </header>
        <div>
          <div>
            <nav>
              <Query onChange={this.onChange} />
            </nav>
          </div>
        </div>
        <div>
          <MyCanvas tables={this.state.tables} renderTableChange={this.renderTableChange} changeTableHeader={this.changeTableHeader} changeTableTitle={this.changeTableTitle} deleteRow={this.deleteRow}/>
        </div>
        <div className="hero-foot">
        </div>
      </div>
    );
  }
}
export default App;
