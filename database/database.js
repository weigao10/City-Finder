const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

if (!process.env.MLAB_URL) {
  var {MLAB_URL} = require('../config.js');
}

mongoose.connect(process.env.MLAB_URL || MLAB_URL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database!!')
});

const citySchema = mongoose.Schema({
  id: Number,
  city_name_short: String,
  city_name_long: String,
  state: String,
  region: String,
  avg_high_temp: Number,
  climate: String,
  rent_cost: String,
  rent: String, 
  avg_rent_index: Number, 
  by_ocean: String,
  by_mountains: String,
  by_lake: String,
  population: Number,
  city_size: String,
  zip_code: Number,
  image_url: String,
  yahoo_weather_id: Number
});

const City = mongoose.model('City', citySchema);

const favSchema = mongoose.Schema({
  _id: String,
  id: Number,
  city_name_short: String,
  city_name_long: String,
  state: String,
  region: String,
  avg_high_temp: Number,
  climate: String,
  rent_cost: String,
  rent: String, 
  avg_rent_index: Number, 
  by_ocean: String,
  by_mountains: String,
  by_lake: String,
  population: Number,
  city_size: String,
  zip_code: Number,
  yahoo_weather_id: Number,
  image_url: String
})

const Favorites = mongoose.model('Favorites', favSchema)
// remember to export functions made in this file

let queryDB = (queryObj, callback) => {
  let temp = (queryObj !== '{}') ? JSON.parse(queryObj) : {};
  City.find(temp, (err, docs) => {
    if (err) { console.log('Error in querying the City database! Error is: ', err) };
    callback(err, docs);
  })
}

let addToDB = (data) => {
  Favorites.create(data.city)
}

let deleteFromDB = (data) => {
  Favorites.deleteOne({"id": data.city.id}, (err, data) => {
    console.log('err', err)
  })
}

let getFavesFromDB = (callback) => {
  console.log('in get faves whoo!')
  Favorites.find({}, (err, data) => {
    if (err) { console.log('Error in querying the Favorites database! Error is: ', err) };
    callback(err, data);
  })
}

exports.queryDB = queryDB;
exports.getFavesFromDB = getFavesFromDB;
exports.addToDB = addToDB;
exports.deleteFromDB = deleteFromDB;
