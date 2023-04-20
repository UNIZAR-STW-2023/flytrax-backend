const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const Token = mongoose.model("Token");
const FavAirports = require('../models/favAirports');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../Utils/emails.js");
const Admins = require("../models/admins");

const bcryptSalt = 10;
//const clientURL = "http://localhost:3000";
//const clientURL = "https://flytraxserver-758723.b4a.run";
const clientURL = "https://flytrax-backend.vercel.app"

const _buildUsersList = function (results) {
  let users = [];
  results.forEach((doc) => {
    users.push({
      name: doc.name,
      surname: doc.surname,
      nickname: doc.nickname,
      email: doc.email,
      phone: doc.phone,
      dateOfBirth: doc.dateOfBirth,
      country: doc.country,
      gender: doc.gender,
      password: doc.password,
      banned: doc.banned,
      _id: doc._id,
    });
  });
  return users;
};

const getUsers = function (req, res) {
  Users.find({}).then(function (results) {
    const users = _buildUsersList(results);
    res.status(200).json(users);
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
    gender: req.body.gender,
  };


  // Insertamos el usuario en la colección "Users"
  Users.create(user, function (results) {
    res.status(200).json({
      User: user,
    });
  });
};

const getUsersByEmail = function (req, res) {
  const user = {
    email: req.params.email,
  };
  Users.find(user).then(function (results) {
    res.status(200).json(results);
  });
};

const resetPasswordByEmail = async function (req, res) {
  const user = {
    email: req.params.email,
  };
  var id = "";
  try {
    const results = await Users.find(user); // realizar la consulta a la base de datos y esperar la respuesta
    id = results[0]._id.toString(); // obtener el campo "id" del primer resultado
    // hacer algo más con el valor de "id" aquí dentro de la función
  } catch (error) {
    console.log("Error:", error);
  }
  if (!id) {
    throw new Error("No existe el usuario...");
  }
  let token = await Token.findOne({ userId: id });
  if (token) {
    await token.deleteOne();
  }

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = bcrypt.hashSync(resetToken, Number(bcryptSalt));

  new Token({
    userId: id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/restore-passwd?token=${resetToken}&id=${id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    { name: user.email, link: link },
    "./templates/email_template.handlebars"
  );

  res.status(200).json({ link: link });
};

const resetPassword = async (req, res) => {
  console.log(req.body.id);
  console.log(req.body.token);
  console.log(req.body.password);
  id = req.body.id;
  token = req.body.token;
  password = req.body.password;


  let passwordResetToken = await Token.findOne({ userId: id });


  if (!passwordResetToken) {
    res.status(200).json("No existe token de restauracion de contraseña");
  }

  if (token != passwordResetToken.token) {
    res.status(200).json("No existe token de restauracion de contraseña");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await Users.updateOne(
    { _id: id },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await Users.findById({ _id: id });
  sendEmail(
    user.email,
    "Contraseña actualizada correctamente",
    { name: user.email },
    "./templates/email_template_reset.handlebars"
  );
  await passwordResetToken.deleteOne();
  res.json("Contraseña actualizada correctamente");
};

const loginUsers = async function (req, res) {
  console.log("Entra a login users")
  const user = {
    email: req.body.email,
  };

  //Tenemos que ver si existe en la tabla de admins
  const adminEncontrado = await Admins.findOne(user);
  if (adminEncontrado){
    res.status(200).json({"esAdmin": "true", adminEncontrado});
    console.log(adminEncontrado)
  }else{
    const userEncontrado = await Users.findOne(user);
    if (userEncontrado){
      res.status(200).json({"esAdmin": "false", userEncontrado});
      console.log(userEncontrado)
    }else{
      res.status(200).json({"status": "No se ha encontrado ese usuario en la bd"});
    }
  }


};


const banUsers = function (req, res) {
  const email = req.body.email;
  console.log(email) 

  Users.findOneAndUpdate(
    { email: email }, // busca el usuario con el correo electrónico especificado
    { banned: true }, // actualiza el campo banned a true
    { new: true }, // devuelve el usuario actualizado en lugar del usuario original
    function (err, user) {
      if (err) {
        // maneja el error si lo hay
        console.error(err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      if (!user) {
        // si no se encuentra ningún usuario con el correo electrónico especificado, devuelve un error
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      // si se actualizó el usuario correctamente, devuelve el usuario actualizado
      return res.json({ "status": 'Usuario baneado correctamente', user});
    }
  );
};

const unBanUsers = function (req, res) {
  const email = req.body.email;

  Users.findOneAndUpdate(
    { email: email }, // busca el usuario con el correo electrónico especificado
    { banned: false }, // actualiza el campo banned a true
    { new: true }, // devuelve el usuario actualizado en lugar del usuario original
    function (err, user) {
      if (err) {
        // maneja el error si lo hay
        console.error(err);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
      if (!user) {
        // si no se encuentra ningún usuario con el correo electrónico especificado, devuelve un error
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      // si se actualizó el usuario correctamente, devuelve el usuario actualizado
      return res.json({ "status": 'Usuario desbaneado correctamente', user});
    }
  );
};

const getBannedUsers = function (req, res) {
  Users.find({banned: true}).then(function (results) {
    res.status(200).json(results);
  });
};


const saveAirports = async (req, res) => {
  console.log("Voy a entrar a guardar un aeropuerto brother")
  console.log(req.body.email);
  console.log(req.body.iata);
  email = req.body.email;
  iata = req.body.iata
  const postData = {
    "email": email,
    "iata": iata
  }
  FavAirports.create(postData, function (results) {
    res.status(200).json({
      "status": "Introducido correctamente",
      "email": email,
      "iata": iata
    });
  });


};

module.exports = {
  getUsers,
  postUsers,
  getUsersByEmail,
  resetPasswordByEmail,
  loginUsers,
  resetPassword,
  banUsers,
  unBanUsers,
  getBannedUsers,
  saveAirports
};
