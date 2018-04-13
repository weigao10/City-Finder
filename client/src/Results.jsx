import React from 'react';
import axios from 'axios';

class Results extends React.Component{
  constructor(props){
    super(props)
    this.stylePopulation = this.stylePopulation.bind(this);
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

  // CONVERT POPULATION TO A STRING AND ADD COMMAS FOR RENDERING PURPOSES
  stylePopulation(population) {
    var reversed = population.toString().split('').reverse();
    for (var i = 3; i < reversed.length; i += 3) {
      reversed.splice(i, 0, ',');
      i++;
    }
    return reversed.reverse().join('');
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

            var popString = this.stylePopulation(city.population)

            return (
            <div className="cityPanel" value={city} style={style} 
                                       onClick={() => {(this.props.showFavorites) ? this.delete(city) : this.save(city)}}
                                       key={city._id}>
              <div className="container" >
                <div className="overlay">
                  <h2 className="has-text-black has-text-weight-bold">{city.city_name_short}, {city.state}</h2>
                  <div className="has-text-black has-text-weight-semibold">Population: {popString}</div>
                  <div className="has-text-black has-text-weight-semibold">Average rent: ${city.rent_cost}</div>
                  <div className="has-text-black has-text-weight-semibold">Average high temp: {city.avg_high_temp}{'\xB0'}</div>
                </div> 
                <div className="info">
                  <h2 className="has-text-black has-text-weight-bold">{city.city_name_short}, {city.state}</h2>
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