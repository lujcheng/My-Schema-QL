import React, { Component } from 'react';
import './App.css';
import './styles.css';
import Table from './table.jsx';
import Query from './query.jsx'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = { 
      user: "1",
      query: {
        tables: null,
        columns: null,
        values: null
      },
      tables: {
        cars: {
          data: [
            { make: 'VW', model: 'Jetta', year: '2010'},
            { make: 'Ford', model: 'Fiesta', year: '2015'},
            { make: 'Chevy', model: 'Blazer', year: '2000'},
            { make: 'Honda', model: 'Accord', year: '1978'},
          ],
          foreignKey: null,
          xY: null 
        },
        guitars: {
          columns: [
            { make: 'Fender', model: 'Tele', year: '2010'},
            { make: 'Gibson', model: 'SG', year: '2015'},
            { make: 'Guild', model: 'Starfire', year: '2001'},
            { make: 'Gretsch', model: 'Jet', year: '2005'}
          ],
          foreignKey: null,
          xY: null
        },
      }
    }
    this.onChange = this.onChange.bind(this)
    this.select = this.select.bind(this)
  }

  select = (input, table, column) => {
    let rows = this.state.tables[table].data
    let columns = rows.map(row => row[column])
    let query = columns.filter((values, index, column) => column.indexOf(values) === input)
    console.log(this.state.query.tables)
  }

  onChange = (event) => {
    event.target.name === 'select' ?
    this.setState({ query: {...this.state.query, columns: event.target.value}}) :
    this.setState({ query: {...this.state.query, tables: event.target.value}})
    console.log(this.state.query)
  }
  
  render() {
    console.log(this.state.query)
    return (
      <div>
        <div>
          <Table tables={this.state.tables}/>
        </div>
        <div>
          <Query onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
export default App;


// uniqueCarMakes = cars.map(car => car.make) //['a', 'b', 'a', 'c', 'a']
//   .filter((makes, index, self) => self.indexOf(makes) === index) // ['a', 'b', 'c']



// Object.keys(columns) // => ['make', 'mode', 'year]



// rows.map(row => {})

// // 
// Make              Model         Year
// -------------
// [
//   { make: columns['make']0,  columns['model']0
// 1
// 2
// 3
// 4
// 5
