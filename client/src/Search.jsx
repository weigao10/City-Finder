import react from 'react';
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
    
  }

  onToggle(){

  }
}

export default Search;