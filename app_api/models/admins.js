/*
  File's name: admins.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
    email: {
      type: String,
      Required: true
    },
    password: {
      type: String,
      Required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    tokenAdmin: {
      type: String,
      required:true,
      default: ""
    }
  });

  module.exports = mongoose.model( "Admin" , adminsSchema);
