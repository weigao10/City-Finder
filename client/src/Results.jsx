import React from 'react';
import axios from 'axios';

class Results extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    
    if (this.props.cities.length > 0){
      
      return (
        <div className='cities' onClick={this.props.showFaves ? this.delete : this.save}>
          {this.props.cities.map((city) => {
            let style = {
              backgroundImage: 'url(' + city.image_url + ')'
            }
            return (<div value={city} style={style}>
              <h3>{city.city_name_short}, {city.state}</h3>
              <a>Pop: {city.population}</a>
              <a>$/month: {city.rent}</a>
            </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>No cities match your search. Please select fewer filters.</div>
      )
    }
  }
}

export default Results;

