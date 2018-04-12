import React from 'react';
import axios from 'axios';

class Results extends React.Component{
  constructor(props){
    super(props)
  }

  save(city){
    axios.post('/addFaves', {
      city: city
    })
    .then((res) => {
      res.end()
    })
    .catch((err) => {
      console.log('err in save city client')
    })
  }

  delete(city){
    axios.post('/deleteFaves', {
      city:city
    })
    .then((res) => {
      axios.get('/faves')
      .then((data) => {
        this.props.setInfo('favorites', data.data)
      })
    })
    .catch((err) => {
      console.log('err in save city client', err)
    })
  }

  render(){
    let display = this.props.cities
    if(this.props.showFavorites){
      display = this.props.favorites
    } else{
      display = display.sort(function(){
        return .5-(Math.random())
      })
    }

    if (display.length > 0){
      return (
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
            <div className="cityPanel" value={city} style={style} 
                                      onClick={() => {(this.props.showFavorites) ? this.delete(city) : this.save(city)}}>
              <div className="container" >
                <div className="overlay">
                  <div>Population: {city.population}</div>
                  <div>rent/month: ${city.rent}</div>
                </div> 
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