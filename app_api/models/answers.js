const mongoose = require('mongoose');

const answersSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  fecha_creacion: {
    type: String,
    required: true,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Topics',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  }
});


  module.exports = mongoose.model( "Answers" , answersSchema);
