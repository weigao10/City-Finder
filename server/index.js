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
 console.log('req.query in server get/cities is: ', req.query);
 let queryObj = JSON.parse(req.query[0]);
  DB.queryDB(queryObj, (err, docs) => {
    if (err) {console.log('ERROR IN GETTING RESULTS FROM DB: ', err)}
    else {
      console.log('calling queryDB in server')
      console.log('docs received from server are: ', docs)
      res.send(docs);
    }
  })    
});

// let test = {
//   $or: [{id: 1}, {id: 2}]
// }



app.listen(process.env.PORT || 3000, () => {
  console.log('server listening on 3000!')
})

