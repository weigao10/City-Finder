const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const helpers = require(path.join(__dirname + '/../database/helpers.js'));
const DB = require(path.join(__dirname + '/../database/database.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

app.get('/cities', (req, res) => {
  // call DB.queryDB here to make a query to the database for the cities that match the queryString from the front end
  /*
  let queryObj = object that contains the queryString
  */
 console.log('req.query in server get/cities is: ', req.state);
//  let queryObj = JSON.stringify(req.query);
//  console.log('query obj in server get/cities is: ', queryObj);
  let queryString = makeQueryString(req.state)
  DB.queryDB(queryString, (err, docs) => {
    if (err) {console.log('ERROR IN GETTING RESULTS FROM DB: ', err)}
    else {
      console.log('docs received from server are: ', docs)
      res.send(docs);
    }
  })    
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server listening on 3000!')
})

let makeQueryString = (queries) => {
  let allQueries = []
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
