const mongoose = require('mongoose');
const { users } = require('moongose/models');
const Users = mongoose.model('Users');

const _buildUsersList = function(results) {
    let users = [];
    results.forEach((doc) => {
      users.push({
        name: doc.name,
        surname: doc.surname,
        nickname: doc.nickname,
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

/*const postUsers = function (req, res) {
    Users.insertOne(
        { name: req.body.name,
            surname: req.body.surname,
            nickname: req.body.nickname
         }).then(function (res) {
        res
          .status(200)
          .json("Usuario creado con éxito.");
         });
  };*/


module.exports = {
    getUsers,
    //postUsers
};