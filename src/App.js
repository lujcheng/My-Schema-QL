import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './table.jsx';

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = { 
      user: "1",
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
  }
  
  render() {
    return (
      <div>
        <Table tables={this.state.tables}/>
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
