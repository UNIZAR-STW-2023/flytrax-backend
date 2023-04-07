const mongoose = require('mongoose');


const favAirportsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  iata: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FavAirports', favAirportsSchema);
