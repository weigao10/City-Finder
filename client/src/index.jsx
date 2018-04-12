import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
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
    this.setInfo = this.setInfo.bind(this)
  }

  componentDidMount() {
    this.getCities({});
  }

  toggleFav(){
    this.setState({
      showFavorites: !this.state.showFavorites
    })
  }

  setInfo(state, data) {
    this.setState({
      [state]: data
    })
  }

  // getCities will return the cities that match the query string
  getCities(state) {    
    axios.get('/cities', {
      params: state
    })
      .then( (results) => {
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
                                                          setInfo = {this.setInfo}/></div>
          <div className="column is-three-quarters"><Results cities={this.state.cities}
                                                              favorites={this.state.favorites}
                                                              setInfo = {this.setInfo}
                                                              showFavorites={this.state.showFavorites}/></div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));