import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './Search.jsx'
import Results from './Results.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      cities: []
    }    
    this.getCities = this.getCities.bind(this);
  }

  componentDidMount() {
    //test object 
//     let test = {
//     "$and": [
//         {
//             "$or": [
//                 {
//                     "id": 1
//                 },
//                 {
//                     "id": 2
//                 }
//             ]
//         },
//         {
//             "$or": [
//                 {
//                     "region": "Northeast"
//                 }
//             ]
//         }
//     ]
// }
    this.getCities(JSON.stringify(test));
  }

  
  // getCities will return the cities that match the query string
  getCities(query) {    
    console.log('Sending GET request to /cities')
    axios.get('/cities', {
      params: query
    })
      .then( (results) => {
        console.log('Received results from GET/cities: ', results);
        // set the cities that are returned to this.state.cities        
      }) 
      .catch( (error) => {
        console.log('Error in response to GET /cities: ', error);
      })
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>City Finder</h1></header>         
        <div className="main">
          <Search getCities={this.getCities}/>
          <Results cities={this.state.cities}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));