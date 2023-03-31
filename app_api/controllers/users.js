const mongoose = require('mongoose');
const Users = mongoose.model('Users');

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
  console.log("Entro a la api interna nuestra, a insertar un usuario")

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
  console.log(user)


  // Insertamos el usuario en la colección "Users"
  Users.create(user, function(results) {
    res.status(200).json({
            "User": user,
          });
      });      

  console.log("Lo he insertadoooooooooooooooooo")
};


const loginUsers = function (req, res) {
  console.log("Entro a la api interna nuestra, a loguear un usuario")

  const user = {
    email: req.body.email,
  };
  console.log(user)

  // Insertamos el usuario en la colección "Users"
  Users.findOne(user).then(function (results) {
    res
      .status(200)
      .json(results);
  });        

  console.log("Lo he insertadoooooooooooooooooo")
};

module.exports = {
    getUsers,
    postUsers,
    loginUsers
};