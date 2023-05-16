/*
  File's name: topics.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema({
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
  nickname: {
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
