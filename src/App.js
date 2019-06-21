import React, { Component } from 'react';
import './App.css';
import './styles.css';
import Table from './table.jsx';
import Query from './query.jsx'
import { from } from 'rxjs';
import { cpus } from 'os';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = { 
      user: "1",
      query: {
        select: null,
        columns: null,
        values: null
      },
      tables: {
        cars: {
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
          columns: [
            { ID: "1", make: 'Fender', model: 'Tele', year: '2010'},
            { ID: "2", make: 'Gibson', model: 'SG', year: '2015'},
            { ID: "3", make: 'Guild', model: 'Starfire', year: '2001'},
            { ID: "4", make: 'Gretsch', model: 'Jet', year: '2005'}
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
    if(this.state.tables[table]) {
      let newData = this.state.tables[table].data
      let values = newData.map((row => (row[column])))
      console.log(values)
    }
    // let query = columns.filter((values, index, column) => column.indexOf(values) === input)
    // console.log(this.state.query.tables)
  }
  
  onChange = (event, args) => {
    console.log(event.target.name, args)
    this.setState({ query: {...this.state.query, [args]: event.target.value}})
    console.log(this.state.query)
  }
  
  render() {
    console.log(this.select(this.state.query.values, this.state.query.from, this.state.query.select))
    return (
      <div>
        <div>
          <Query onChange={this.onChange} />
        </div>
        <div>
          <Table tables={this.state.tables}/>
        </div>
      </div>
    );
  }
}
export default App;
