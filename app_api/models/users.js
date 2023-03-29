const mongoose = require('mongoose');

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
  }
});

mongoose.model('Users', usersSchema);