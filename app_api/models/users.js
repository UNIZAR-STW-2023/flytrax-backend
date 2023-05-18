/*
  File's name: users.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const mongoose = require('mongoose');
BCRYPT_SALT=10;


const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  password: {
    type:String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  registerDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model( "Users" , usersSchema);
