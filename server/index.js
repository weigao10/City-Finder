const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const {fetchWeather} = require(path.join(__dirname + '/../database/helpers.js'));
const DB = require(path.join(__dirname + '/../database/database.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

app.get('/cities', (req, res) => {
  // call DB.queryDB here to make a query to the database for the cities that match the queryString from the front end

  let temp = (req.query !== '{}') ? req.query[0] : {};
  let queryString = makeQueryString(temp)
  DB.queryDB(queryString, (err, docs) => {
    if (err) {console.log('ERROR IN GETTING RESULTS FROM DB: ', err)}
    else {
      res.send(docs);
    }
  })    
});

app.get('/weather', (req, res) => {
  var stringOfCityIDs = req.query.cityIDs.join(',');

  fetchWeather(stringOfCityIDs, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('server error!')
    } else {
      res.status(200).send(data);
    }
  })
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server listening on 3000!')
})


let makeQueryString = (props) => {
  let allQueries = []
  let queries = (props ? JSON.parse(props) : {})
  for (let category in queries) {
    let oneQuery = [];
    if (queries[category].length > 0) {
      queries[category].forEach((selection) => {
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
  if(allQueries.length > 0){
    obj["$and"] = allQueries;
  } 
  return JSON.stringify(obj)
}
