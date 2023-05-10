const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date:{
    type: Date, 
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  iata: {
    type: String,
    required: true,
  },
  respuesta: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answers'
  }]
});


  module.exports = mongoose.model( "Topics" , topicsSchema);
