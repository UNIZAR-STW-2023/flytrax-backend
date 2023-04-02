const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
BCRYPT_SALT=10;
const bcryptSalt = process.env.BCRYPT_SALT;


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
  }
});

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});


mongoose.model('Users', usersSchema);