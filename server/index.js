const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const {fetchWeather} = require(path.join(__dirname + '/../database/helpers.js'));
const DB = require(path.join(__dirname + '/../database/database.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

app.get('/faves', (req, res) => {
  //call DB to get favorites from database
  
  DB.getFavesFromDB((err, data) => {
    if (err) {console.log('ERROR IN GETTING FAVES FROM DB: ', err)}
    else {
      res.send(data)
    }
  })
})

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
  var dummyString = '2459115,2442047,2379574,2388929,2424766,2514815,2450022,2471217,2357024,2367105,2471390,2487956,2482250,2391585,2490383,2452078,2487889,2503863,2391279,2358820,2486982,2378426,2466256,2487796,2487796,2473224,2486340,2436704,2380358,2430683,2357536,2383660,2381475,2427032,2488042,2457170,2512636,2477058,2451822,2428344';

  fetchWeather(dummyString, (err, data) => {
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
