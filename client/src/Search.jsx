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
      city_size: []
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {    
    let buttonClickedName = event.target.name;
    let buttonClickedValue = event.target.value;
    console.log('This button was clicked: ', buttonClickedName, buttonClickedValue);    
  }

  render(){
    return (
      <div>
        <div>
          Cost of Living:
          <button name="rent" value="low" onClick={(event) => {this.handleButtonClick(event)}}>Low</button>    
          <button name="rent" value="medium" onClick={(event) => {this.handleButtonClick(event)}}>Med</button>
          <button name="rent" value="high" onClick={(event) => {this.handleButtonClick(event)}}>High</button>
        </div>
        <div>
          Weather:
          <button name="climate" value="cold" onClick={(event) => {this.handleButtonClick(event)}}>Low</button>    
          <button name="climate" value="mild" onClick={(event) => {this.handleButtonClick(event)}}>Med</button>
          <button name="climate" value="hot" onClick={(event) => {this.handleButtonClick(event)}}>High</button>
        </div>
        <div>
          Region:
        </div>
        <div>
          Environment:
        </div>
        <div>
          Population:
        </div>
      </div>
    )
  }

  onToggle(){

  }
}

export default Search;