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
      cities: [],
      favorites: [],
      showFavorites: false
    }    
    this.getCities = this.getCities.bind(this);
    this.toggleFav = this.toggleFav.bind(this);
    this.setFaves = this.setFaves.bind(this)
  }

  componentDidMount() {
    this.getCities({});
  }

  toggleFav(){
    this.setState({
      showFavorites: !this.state.showFavorites
    })
  }

  setFaves(data) {
    console.log('set faves to', data.data)
    this.setState({
      favorites: data.data
    })
  }

  // getCities will return the cities that match the query string
  getCities(state) {    
    console.log('Sending GET request to /cities', state)
    axios.get('/cities', {
      params: state
    })
      .then( (results) => {
        console.log('Received results from GET/cities: ', results);
        this.setState({
          cities: results.data
        })      
      }) 
      .catch( (error) => {
        console.log('Error in response to GET /cities: ', error);
      })
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>City Finder</h1></header>         
        <div className="main columns">
          <div className="column is-one-quarter"><Search getCities={this.getCities} getFaves={this.getFaves} 
                                                          showFavorites={this.state.showFavorites}
                                                          toggleFav = {this.toggleFav}
                                                          setFaves = {this.setFaves}/></div>
          <div className="column is-three-quarters"><Results cities={this.state.cities}
                                                              favorites={this.state.favorites}
                                                              showFavorites={this.state.showFavorites}/></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));