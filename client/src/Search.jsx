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
    this.onToggle = this.onToggle.bind(this)
    this.makeQueryObj = this.makeQueryObj.bind(this)
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
          <button name="rent" value="low" onClick={(event) => {this.onToggle(event)}}>Low</button>    
          <button name="rent" value="medium" onClick={(event) => {this.onToggle(event)}}>Med</button>
          <button name="rent" value="high" onClick={(event) => {this.onToggle(event)}}>High</button>
        </div>
        <div>
          Weather:
          <button name="climate" value="cold" onClick={(event) => {this.onToggle(event)}}>Low</button>    
          <button name="climate" value="mild" onClick={(event) => {this.onToggle(event)}}>Med</button>
          <button name="climate" value="hot" onClick={(event) => {this.onToggle(event)}}>High</button>
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

  onToggle(event){
    //check if state has value
    if (this.state[event.target.name].includes(event.target.value)){
      var newStateArr = this.state[event.target.name].slice()
      newStateArr.splice(this.state[event.target.name].indexOf(event.target.value), 1)
      this.setState({
        [event.target.name]: newStateArr,
      }, () => {
        let queryObj = this.makeQueryObj();
        // this.props.getCities(queryObj)
        console.log('removed state item', queryObj)
      })
    } else {
      var newStateArr = this.state[event.target.name].slice();
      newStateArr.push(event.target.value);
      this.setState({
        [event.target.name]: newStateArr
      }, () => {
        let queryObj = this.makeQueryObj();
        // this.props.getCities(queryObj)
        console.log('added state item', queryObj)
      })
      
    }
  }

  makeQueryObj() {
    let allQueries = []
    for (let category in this.state) {

      let oneQuery = [];
      if (this.state[category].length > 0) {
        this.state[category].forEach((selection) => {
          let obj = {};
          obj[category] = selection;
          oneQuery.push(obj);
        })
        let obj = {}
        obj["$or"] = oneQuery;
        allQueries.push(obj)
      }
    }
    let obj = {}
    obj["$and"] = allQueries;
    return (obj);
  }
}

export default Search;