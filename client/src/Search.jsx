import React from 'react';
import axios from 'axios';

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      region: [],
      climate: [],
      rent: [],
      by_ocean: [],
      by_mountains: [],
      by_lake: [],
      city_size: [],
      rent_cost:[]
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onToggle = this.onToggle.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
    this.getFaves = this.getFaves.bind(this)
  }

  handleButtonClick(event) {    
    let buttonClickedName = event.target.name;
    let buttonClickedValue = event.target.value;
    console.log('This button was clicked: ', buttonClickedName, buttonClickedValue);    
  }

  triggerButton(id) {
    let buttonId = document.getElementById(id);
    buttonId.style.backgroundColor = (buttonId.style.backgroundColor === 'dodgerblue') ? 'white' : 'dodgerblue'
  }

  clearFilters(){
    var buttons = document.getElementsByTagName("button");
      for (var key in buttons){
        if (buttons[key].style){ //this line accounts for clar filters button
          buttons[key].style.backgroundColor = 'white'
        }
      }
    this.setState({
      region: [],
      climate: [],
      rent: [],
      by_ocean: [],
      by_mountains: [],
      by_lake: [],
      city_size: []
    }, () => {
      this.props.getCities()
    })
  }  

  render(){
    return (
      <div className="buttons">
        <div className="buttonRow">
          <p className="button-title">Cost of Living:</p>
          <button className="width-one-third five-px-pad" id="1" name="rent" value="low" onClick={(event) => {this.onToggle(event)}}>Low</button>    
          <button className="width-one-third five-px-pad" id="2" name="rent" value="medium" onClick={(event) => {this.onToggle(event)}}>Med</button>
          <button className="width-one-third five-px-pad" id="3" name="rent" value="high" onClick={(event) => {this.onToggle(event)}}>High</button>        
        </div>
        <div className="buttonRow">
          <p className="button-title">Weather:</p>
          <button className="width-one-third five-px-pad" id="4" name="climate" value="cold" onClick={(event) => {this.onToggle(event)}}>Cold</button>    
          <button className="width-one-third five-px-pad" id="5" name="climate" value="mild" onClick={(event) => {this.onToggle(event)}}>Mild</button>
          <button className="width-one-third five-px-pad" id="6" name="climate" value="hot" onClick={(event) => {this.onToggle(event)}}>Hot</button>
        </div>
        <div className="buttonRow">
          <p className="button-title">Region:</p>
          <button className="width-one-third five-px-pad" id="7" name="region" value="Northeast" onClick={(event) => {this.onToggle(event)}}>Northeast</button>    
          <button className="width-one-third five-px-pad" id="8" name="region" value="Southeast" onClick={(event) => {this.onToggle(event)}}>Southeast</button>
          <button className="width-one-third five-px-pad" id="9" name="region" value="Midwest" onClick={(event) => {this.onToggle(event)}}>Midwest</button>
          <br></br>
          <button className="width-one-third five-px-pad" id="10" name="region" value="Southwest" onClick={(event) => {this.onToggle(event)}}>Southwest</button>
          <button className="width-one-third five-px-pad" id="11" name="region" value="Rockies" onClick={(event) => {this.onToggle(event)}}>Rockies</button>
          <button className="width-one-third five-px-pad" id="12" name="region" value="Pacific" onClick={(event) => {this.onToggle(event)}}>Pacific</button>
        </div>
        <div className="buttonRow">
          <p className="button-title">Environment:</p>
          <button className="width-one-third five-px-pad" id="13" name="by_ocean" value="TRUE" onClick={(event) => {this.onToggle(event)}}>Near the ocean</button>    
          <button className="width-one-third five-px-pad" id="14" name="by_mountains" value="TRUE" onClick={(event) => {this.onToggle(event)}}>In the mountains</button>
          <button className="width-one-third five-px-pad" id="15" name="by_lake" value="TRUE" onClick={(event) => {this.onToggle(event)}}>Near major lake</button>
        </div>
        <div className="buttonRow">
          <p className="button-title">Metro size:</p>
          <button className="width-one-third five-px-pad" id="16" name="city_size" value="small" onClick={(event) => {this.onToggle(event)}}>Small</button>
          <button className="width-one-third five-px-pad" id="17" name="city_size" value="medium" onClick={(event) => {this.onToggle(event)}}>Mid-size</button>
          <button className="width-one-third five-px-pad" id="18" name="city_size" value="big" onClick={(event) => {this.onToggle(event)}}>Big</button>
        </div>
        <div className="buttonRow marginTop20">
        <button className="one-hundred-percent" onClick = {this.clearFilters}>Show All Cities</button>
        </div>
        <div className="buttonRow marginTop20">
        <button className="one-hundred-percent" id="20" onClick={(event) => {this.displayOnPage(event)}}>Show Favorites</button>
        </div>
      </div>
    )
  }

  displayOnPage(event){ 
    this.triggerButton(event.target.id);
    if(!this.props.showFavorites){
      this.getFaves()
    } else {
      this.props.getCities(JSON.stringify(this.state))
    }
    this.props.toggleFav();
  }

  getFaves(){
    axios.get('/faves')
    .then((res) => {
      this.props.setInfo('favorites', res.data)
    })
    .catch((err) => {
      console.log('err in client get /faves', err)
    })
  }

  onToggle(event){
    //change the color of the button when clicked
    this.triggerButton(event.target.id);
    //check if state has value
    if (this.state[event.target.name].includes(event.target.value)){
      var newStateArr = this.state[event.target.name].slice()
      newStateArr.splice(this.state[event.target.name].indexOf(event.target.value), 1)
      this.setState({
        [event.target.name]: newStateArr,
      }, () => {
        this.props.getCities(JSON.stringify(this.state))
      })
    } else {
      var newStateArr = this.state[event.target.name].slice();
      newStateArr.push(event.target.value);
      this.setState({
        [event.target.name]: newStateArr
      }, () => {
        this.props.getCities(JSON.stringify(this.state))
      })
    }
  }
}

export default Search;