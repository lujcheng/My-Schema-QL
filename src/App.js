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
      user: "1",
      query: {
        values: null
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
          foreignKey: null,
          xY: null,
          selected: {
            columnIndexes: null
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
          foreignKey: null,
          xY: null,
          selected: {
            columnIndexes: null
          }
        },

        /*

          data: [
            { ID: "1", make: 'VW', model: 'Jetta', year: '2010'},
            { ID: "2", make: 'Ford', model: 'Fiesta', year: '2015'},
            { ID: "3", make: 'Chevy', model: 'Blazer', year: '2000'},
            { ID: "4", make: 'Honda', model: 'Accord', year: '1978'},
          ],
          foreignKey: null,
          xY: null 
        },
        guitars: {
          data: [
            { ID: "1", make: 'Fender', model: 'Tele', year: '2010'},
            { ID: "2", make: 'Gibson', model: 'SG', year: '2015'},
            { ID: "3", make: 'Guild', model: 'Starfire', year: '2001'},
            { ID: "4", make: 'Gretsch', model: 'Jet', year: '2005'}
          ],
          foreignKey: null,
          xY: null
        },
      }
      */
    }
  }
    this.onChange = this.onChange.bind(this)
    this.select = this.select.bind(this)
  }
/*
  ***** JOIN BASED ON TWO TABLES AND 2 KEYS **********
  const join = (tables, keys) => {
  stateTbl = state.tables
  let joinColumns = []
  let joinValues = []
  let forKey = stateTbl[tables[0]].columns.indexOf(keys[0])
  let primeKey = stateTbl[tables[1]].columns.indexOf(keys[1])
  joinColumns = stateTbl[tables[0]].columns.concat(stateTbl[tables[1]].columns)
    for (let i=0; i < stateTbl[tables[0]].values.length; i++) {
      for (let e=0; e< stateTbl[tables[1]].values.length; e++) {
        console.log(stateTbl[tables[0]].values[i][forKey])
      if(stateTbl[tables[0]].values[i][forKey] === stateTbl[tables[1]].values[e][primeKey] )
      joinValues[i] = stateTbl[tables[0]].values[i].concat(stateTbl[tables[1]].values[e])
      }
    }
  console.log(joinValues)
}

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
  select = () => {
    let query = this.state.query
    let columns = null
    let table = null
    const search = {}
    if ('select' in query && typeof query.select === 'string') {
      columns = query.select.split(/[ ,]+/)
      search.columns = columns
    }
    if ('from' in query && typeof query.from === 'string') {
      table = query.from.split(/[ ,]+/)
      search.table = table
    }
    // console.log(search)
    let columnIndexes = null
    if ("columns" in search && "table" in search) {
      columnIndexes = search.columns.map(column => {
        if (search.table in this.state.tables && this.state.tables[search.table].columns.indexOf(column) >= 0) {
          return this.state.tables[search.table].columns.indexOf(column)
        } else {
          return null
        }
      })
    }
    console.log("query.from?!?!?", columnIndexes)
    if (columnIndexes) {
      this.setState(prevState => ({
        ...prevState, tables: {
          ...prevState.tables, [query.from]: { 
            ...prevState.tables[query.from], selected: {
              ...prevState.tables[query.from].selected, columnIndexes: columnIndexes
            }
          }
        }
      }))
      console.log(this.state.tables)
    }
    
    
  }
    // let query = columns.filter((values, index, column) => column.indexOf(values) === input)
    // console.log(this.state.query.tables)
  
  
  onChange = (event, args) => {
    this.setState({ query: {...this.state.query, [args]: event.target.value}}, this.select)
    console.log("selected?", this.state.tables.cars)
  }

  
  render() {
  
    return (
      <div>
        <div>
          <NewTable />
        </div>
        <div>
          <Query onChange={this.onChange} />
        </div>
        <div>
          <MyCanvas tables={this.state.tables}/>
        </div>
      </div>
    );
  }
}
export default App;
