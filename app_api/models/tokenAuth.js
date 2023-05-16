/*
  File's name: tokenAuth.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const mongoose = require('mongoose');

const tokenAuthSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      ref: 'Users',
    },
    tokenAuth: {
      type: String,
      required: true,
    },
    //Esto se crea solo
    tokenCreation: {
      type: Date,
      default: Date.now,
    }
  });

  module.exports = mongoose.model( "TokenAuth" , tokenAuthSchema);
