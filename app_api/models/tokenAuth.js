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
    }
  });

  module.exports = mongoose.model( "TokenAuth" , tokenAuthSchema);
