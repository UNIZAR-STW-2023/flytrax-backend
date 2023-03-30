const mongoose = require('mongoose');
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

const postUsers = function (req, res) {
  console.log("Entro a la api interna nuestra, a insertar un usuario")
  console.log("Y voy a insertar: ")
  console.log("nombre:", req.body.name)
  console.log("surname:", req.body.surname)
  console.log("nickname:", req.body.nickname)

  const user = {
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname
  };

  // Insertamos el usuario en la colección "Users"
  Users.insertOne(user, function(err, result) {
    if (err) {
      console.log("Error al insertar el usuario:", err);
    } else {
      console.log("Usuario insertado correctamente");
      // Devolvemos el resultado de la inserción
      callback(result);
    }
  });

  console.log("Lo he insertadoooooooooooooooooo")
};


module.exports = {
    getUsers,
    postUsers
};