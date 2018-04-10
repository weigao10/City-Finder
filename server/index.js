const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const helpers = require(path.join(__dirname + '/../database/helpers.js'));
const DB = require(path.join(__dirname + '/../database/database.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log('server listening on 3000!')
})

