import React from 'react';
import axios from 'axios';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      region: '*',
      avg_high_temp: '*',
      avg_rent: '*',
      by_ocean: '*',
      by_mountains: '*',
      by_lake: '*',
      population: '*'
    }
  }

  render(){
    return (
      <div></div>
    )
  }

  onToggle(){

  }
}

export default Search;