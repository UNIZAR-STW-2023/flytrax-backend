const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Token = mongoose.model('Token');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendEmail = require('../Utils/emails.js');


const bcryptSalt = 10
//const clientURL = "https://localhost:3000"


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

const resetPasswordByEmail = async function (req, res) {
  const user = {
    email: req.params.email,
  };
  var id = ""
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
  sendEmail(user.email,"Password Reset Request",{name: user.email,link: link,},"./templates/email_template.handlebars");

  res.status(200).json({"link": link});
}

const resetPassword = async (req, res) => {
  console.log(req.body.id)
  console.log(req.body.token)
  console.log(req.body.password)
  id = req.body.id
  token = req.body.token
  password = req.body.password

   let passwordResetToken = await Token.findOne({ userId: id });

   if (!passwordResetToken) {
     throw new Error("Invalid or expired password reset token");
   }

   if (token != passwordResetToken.token) {
     throw new Error("Invalid or expired password reset token");
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
     {name: user.email},
     "./templates/email_template_reset.handlebars"
   );
   await passwordResetToken.deleteOne();
  res.json("Contraseña actualizada correctamente")
};
  



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
    loginUsers,
    resetPassword
};