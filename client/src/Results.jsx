import React from 'react';
import axios from 'axios';

class Results extends React.Component{
  constructor(props){
    super(props)
  }

  addHoverClass(e) {
        
  }
  render(){
    let display = this.props.cities
    if(this.props.showFavorites){
      display = this.props.favorites
    }
    console.log('display is ', display)

    if (display.length > 0){
      return (
        // <div className='cities' onClick={this.props.showFaves ? this.delete : this.save}>
        <div className='cities'>
          {display.map((city) => {
            let style = {
              backgroundImage: 'url(' + city.image_url + ')',
              width: "300px",
              height: "200px",
              backgroundPosition: "center",
              backgroundSize: "cover"
            }
            return (
            <div className="cityPanel" value={city} style={style}>
              <div className="container">
                <div className="overlay">
                  <div>Population: {city.population}</div>
                  <div>rent/month: ${city.rent}</div>
                </div> 
                {/* <div className="info column is-one-third"> */}
                <div className="info">
                  <h3>{city.city_name_short}, {city.state}</h3>
                </div>
              </div>
            </div>
            )
          })}
        </div>
      )
    } else if(display === this.props.favorites){
      return(
        <div>No favorites saved. Please select favorite cities</div>
      )
    } 
    else {
      return (
        <div>No cities match your search. Please select fewer filters.</div>
      )
    }
  }
}

export default Results;