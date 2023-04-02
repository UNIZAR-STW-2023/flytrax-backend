const Users = require('users');
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,// this is the expiry time in seconds
    },
  });

  mongoose.model('Token', tokenSchema);