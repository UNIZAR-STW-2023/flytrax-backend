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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  respuesta: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answers'
  }]
});


  module.exports = mongoose.model( "Topics" , topicsSchema);
