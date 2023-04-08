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
      type: String, 
      required: true
    },
    n_answers:{
      type: Number,
      default: 0
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    }
  });

  module.exports = mongoose.model( "Topics" , topicsSchema);
