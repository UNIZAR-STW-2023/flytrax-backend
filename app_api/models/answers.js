/*
  File's name: answers.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Topics',
  },
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  }
});


  module.exports = mongoose.model( "Answers" , answersSchema);

  