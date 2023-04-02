const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Token = mongoose.model('Token');

const _buildUsersList = function(results) {
    let users = [];
    results.forEach((doc) => {
      users.push({
        name: doc.name,
        surname: doc.surname,
        nickname: doc.nickname,
        email: doc.email,
        phone: doc.phone,
        dateOfBirth:doc.dateOfBirth,
        country: doc.country,
        gender: doc.gender,
        password: doc.password,
        _id: doc._id
      });
    });
    return users;
  };

const getUsers = function (req, res) {
    Users.find({}).then(function (results) {
        const users = _buildUsersList(results);
        res
          .status(200)
          .json(users);
      });        
};

const postUsers = function (req, res) {
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    phone: req.body.phone,
    country: req.body.country,
    password: req.body.password,
    gender: req.body.gender
  };

  // Insertamos el usuario en la colección "Users"
  Users.create(user, function(results) {
    res.status(200).json({
            "User": user,
          });
      });      
};


const getUsersByEmail = function (req, res) {
  const user = {
    email: req.params.email,
  };
  Users.find(user).then(function (results) {
    res
      .status(200)
      .json(results);
  });
}

const resetPasswordByEmail = function (req, res) {
  const user = {
    email: req.params.email,
  };

  const user2 = Users.findOne(user);

  if (!user2) {
      throw new Error("No existe el usuario...");
  }
  let token =  Token.findOne({ userId: user2._id });
  if (token) { 
         token.deleteOne()
  };

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = bcrypt.hash(resetToken, Number(bcryptSalt));

  new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  sendEmail(user.email,"Password Reset Request",{name: user.name,link: link,},"./template/requestResetPassword.handlebars");
  return link;
}


const loginUsers = function (req, res) {
  const user = {
    email: req.body.email,
  };

  //Buscamos si existe el usuario con ese email
  Users.findOne(user).then(function (results) {
    res
      .status(200)
      .json(results);
  });        
};

module.exports = {
    getUsers,
    postUsers,
    getUsersByEmail,
    resetPasswordByEmail,
    loginUsers
};