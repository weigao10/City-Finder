const mongoose = require('mongoose');

if (!process.env.MLAB_URL) {
  const {MLAB_URL} = require('../config.js');
}

mongoose.connect(process.env.MLAB_URL || MLAB_URL);

var db = mongoose.connection;

const citySchema = mongoose.Schema({
  id: ObjectId,
  city_name: String,
  city_name_long: String,
  state: String,
  region: String,
  avg_high_temp: Number,
  avg_rent: Number, 
  avg_rent_index: Number, 
  ocean: Boolean,
  lake: Boolean,
  mountains: Boolean,
  img_url: String
});

const City = mongoose.model('City', citySchema);

// remember to export functions made in this file

