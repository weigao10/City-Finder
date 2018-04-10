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
  }

  componentDidMount() {
    
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>City Finder</h1></header> 
        
        <div className="main">
          <Search />
          <Results cities={this.state.cities}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));