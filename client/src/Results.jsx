import React from 'react';
import axios from 'axios';

class Results extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    if (this.props.cities){
      return (
        <div className = 'cities' onClick = {this.props.showFaves ? this.delete : this.save}>
          {this.props.cities.map((city) => {
            <div city={city} style={`background-image: url(`+city.image_url+`)`}>
            <h3>{city.city_name}, {city.state}</h3>
            <a>Pop: {city.population}</a>
            <a>$/month: {city.avg_rent}</a>
            </div>
          })}
        </div>
      )
    } else {
      return (
        <div>nothing</div>
      )
    }
  }
}

export default Results;

