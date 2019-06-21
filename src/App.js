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
  }
  
  render() {
    return (
      <div>
        <div>
          <Query/>
        </div>
        <div>
          <Table tables={this.state.tables}/>
        </div>
      </div>
    );
  }
}
export default App;
