const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admins = require('../../app_api/models/admins');
const logger = require('../utils/logger');


const apiOptions = {
  //server: "http://localhost:3000",
  server : 'https://flytrax-backend.vercel.app' 
};
const saltRounds = 10;

//Quita el Bearer que mete Postman
function removeBearerPrefix(tokenString) {
  if (tokenString.startsWith('Bearer ')) {
    return tokenString.slice(7);
  } else {
    return tokenString;
  }
}

//Verifica que existe un par email:token, en la tabla de tokens de autorizacion
const verifyAdminToken = function(email, token, callback) {
  Admins.findOne({ email: email, tokenAdmin: token }, function(err, result) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};




//Funcion interna para verificar si un token es valido o no
const verifyToken = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({"status":"Se requiere token de autorización de administrador"});
  }
  token_wo_prefix = removeBearerPrefix(token)

  try {
    const decoded = jwt.verify(token_wo_prefix, "stw_2023!admin_");
    console.log(decoded)

    verifyAdminToken(decoded.email, token_wo_prefix, function(result) {
      if (result){
        next()
      }else{
        return res.status(400).send("No existe un administrador con ese token");
      }
    });
    
  } catch (error) {
    console.log(error)
    return res.status(400).send("No se permite realizar esa operacion. Permiso denegado");
  }
};

/* GET users */
const getUsers = function (req, res) {
  const path = "/api/users";
  const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data.length > 0) {
      res.status(200).json(response.data);
    } else {
      res.status(404).send("No hemos encontrado ningún usuario...");
    }
  });
};

/* banUsers */
const banUsers = function (req, res) {
  const path = "/api/banUsers";
  const url = apiOptions.server + path;
  const postdata = {
    email: req.body.email
  };

  axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .send("No se ha podido eliminar/bannear al usuario");
      }
    })
    .catch((error) => {
    });
};

/* unBanUsers */
const unBanUsers = function (req, res) {
  const path = "/api/unBanUsers";
  const url = apiOptions.server + path;
  const postdata = {
    email: req.body.email
  };

  axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .send("No se ha podido desbanear al usuario");
      }
    })
    .catch((error) => {
    });
};

/* GET users */
const getBannedUsers = function (req, res) {
  const path = "/api/banUsers";
  const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).send("No hemos encontrado ningún usuario baneado...");
    }
  });
};


module.exports = {
  verifyToken,
  getUsers, 
  banUsers, 
  unBanUsers,
  getBannedUsers
};
