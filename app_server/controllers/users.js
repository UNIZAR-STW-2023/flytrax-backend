const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenAuth = require('../../app_api/models/tokenAuth');
const Admins = require("../../app_api/models/admins");
const logger = require('../utils/logger');

//Con esto cambiamos el nodo
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
const verifyUserToken = function(email, token, callback) {
  TokenAuth.findOne({ email: email, tokenAuth: token }, function(err, result) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

const updateAdminToken = async function(email, newToken) {
  try {
    const admin = await Admins.findOne({ email }); // Buscar el admin por su email
    if (admin) { 
      admin.tokenAdmin = newToken; // Actualizar su token
      const updatedAdmin = await admin.save(); // Guardar los cambios en la base de datos
      return updatedAdmin;
    }
  } catch (error) {
    throw error; // Propagar el error para que pueda ser manejado por el llamador de la función
  }
}




//Funcion interna para verificar si un token es valido o no
const verifyToken = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({"status":"Se requiere token de autorización"});
  }
  token_wo_prefix = removeBearerPrefix(token)

  try {
    const decoded = jwt.verify(token_wo_prefix, "stw_2023!");
    verifyUserToken(decoded.email, token_wo_prefix, function(result) {
      if (result){
        next()
      }else{
        return res.status(400).send("No existe un email con ese token");
      }
    });
    
  } catch (error) {
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
      logger.info(`Se han obtenido ${response.data.length} usuarios en la llamada a ${path}`);

    } else {
      res.status(404).send("No hemos encontrado ningún usuario...");
      logger.warn(`No se han encontrado usuarios en la llamada a ${path}`);
    }
  }).catch((error) => {
    logger.error(`Error al obtener los usuarios: ${error} en la llamada a ${path}`);
    res.status(500).send('Ha ocurrido un error al obtener los usuarios.');
  });
};

/* POST users */
const postUsers = function (req, res) {
  const path = "/api/users";
  const url = apiOptions.server + path;

  const passwordHash = bcrypt.hashSync(req.body.password, saltRounds);

  const postdata = {
    name: req.body.name,
    surname: req.body.surname,
    nickname: req.body.nickname,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    phone: req.body.phone,
    country: req.body.country,
    password: passwordHash,
    gender: req.body.gender,
  };

  if (
    !postdata.name ||
    !postdata.surname ||
    !postdata.nickname ||
    !postdata.email ||
    !postdata.dateOfBirth ||
    !postdata.phone ||
    !postdata.country ||
    !postdata.gender ||
    !postdata.password
  ) {
    res.status(404).send("El formato de usuario es incorrecto...");
  } else {
    axios
      .post(url, postdata)
      .then((response) => {
        if (response.status === 200) {
          logger.info(`Se ha introducido correctamente el usuario en la llamada a ${path}`);
          res.status(200).json(response.data);
        } else if (response.status === 500) {
          logger.warn(`No se ha podido introducir el usuario en la llamada a ${path}`);
          res.status(500).json(response.data);
        } else {
          logger.warn(`EL formato de usuario es incorrecto ${path}`);
          res.status(400).send("El formato de usuario es incorrecto...");
        }
      })
      .catch((error) => {
        logger.error(`Error al introducir al usuario los usuarios en la llamada a ${path}: ${error}`);
        res.status(409).json({"status": "Ya existe un usuario con ese email o nickname"})
      });
  }
};

/* GET users BY email*/
const getUsersByEmail = function (req, res) {
  const path = `/api/usersByEmail/${req.params.email}`;
  const url = apiOptions.server + path;

  axios
    .get(url, {})
    .then((response) => {
      if (response.data.length > 0) {
        res.status(200).json(response.data);
        logger.info(`Se ha obtenido el usuario correctamente en la llamada a ${path}`);
      } else {
        logger.warn(`No se ha encontrado ningun usuario con el email: ${req.params.email} en la llamada a ${path}`);
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
      logger.error(`Error al recuperar el usuario en la llamada a ${path}: ${error}`);
    });
};

/* RESET password BY email*/
const resetPasswordByEmail = async function (req, res) {
  const path = `/api/resetPasswordByEmail/${req.params.email}`;
  const url = apiOptions.server + path;

  try {
    const response = await axios.post(url, {});

    if (response.data) {
      res.status(200).json(response.data);
      logger.info(`Se ha restablecido correctamente la contraseña del usuario con correo electrónico: ${req.params.email} en la llamada a ${path}`);
    } else {
      res
        .status(404)
        .send("No hemos encontrado ningún usuario con ese email...");
      logger.warn(`No se ha encontrado ningún usuario con el correo electrónico: ${req.params.email} en la llamada a ${path}`);
    }
  } catch (error) {
    logger.error(`Se produjo un error al restablecer la contraseña del usuario con correo electrónico: ${req.params.email} en la llamada a ${path}: ${error}`);
    res.status(500).send("Ocurrió un error al intentar restablecer la contraseña del usuario. Por favor, inténtelo de nuevo más tarde.");
  }
};

const resetPassword = function (req, res) {
  const path = "/api/resetPassword";
  const url = apiOptions.server + path;

  const postdata = {
    id: req.body.id,
    token: req.body.token,
    password: req.body.password,
  };

  axios
    .post(url, postdata)
    .then((response) => {
      if (response.data.length > 0) {
        res.status(200).json(response.data);
        logger.info(`Se ha restablecido correctamente la contraseña del usuario con ID ${req.body.id} en la llamada a ${path}`);
      } else {
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
        logger.warn(`No se ha encontrado ningún usuario con el ID: ${req.body.id} en la llamada a ${path}`);
      }
    })
    .catch((error) => {
      logger.error(`Se produjo un error al restablecer la contraseña del usuario con ID ${req.body.id} en la llamada a ${path}: ${error}`);
      res.status(500).send("Ocurrió un error al intentar restablecer la contraseña del usuario. Por favor, inténtelo de nuevo más tarde.");
    });
};


/* LOGIN users */
const loginUsers = function (req, res) {
  const path = "/api/loginUsers";
  const url = apiOptions.server + path;
  tokenAdmin = ""
  tokenUser = ""
  const postdata = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!postdata.email) {
    logger.warn(`El email ${postdata.email} no existe en la base de datos en la llamada a ${path}`);
    res.status(404).send("El email es incorrecto...");
  } else {
    axios
      .post(url, postdata)
      .then((response) => {

        if (response.status === 200) {
          email = postdata.email;
          if (response.data.status == "No se ha encontrado ese usuario en la bd"){
            res.json({"status" :"No existe ese usuario"})
            logger.warn(`El email ${postdata.email} no existe en la base de datos en la llamada a ${path}`);
          }
          //Esto es solo en caso de que sea administrador

          if (response.data.esAdmin == "true"){
            passwordRecovered = response.data.adminEncontrado.password;

            if (bcrypt.compareSync(postdata.password, passwordRecovered)) {
              tokenAdmin = jwt.sign(
                {
                  email,
                },
                "stw_2023!admin_"              );
              updateAdminToken(email,tokenAdmin)
              jsonResponse = {
                status: "Successful",
                email: postdata.email,
                tokenUser: "",
                tokenAdmin:tokenAdmin
              };
              res.status(200).json(jsonResponse);
              logger.info(`Se ha iniciado sesión correctamente para el admin con email ${postdata.email} en la llamada a ${path}`);
              return true;
            }else{
              res.status(401).json("Email o contraseña incorrectos...");
              logger.warn(`Email o contraseña incorrectos para el admin en la llamada a ${path}`);
              return false;
            }
          }         
          passwordRecovered = response.data.userEncontrado.password;
          banned = response.data.userEncontrado.banned
          if (bcrypt.compareSync(postdata.password, passwordRecovered) && !banned) {
            //Creamos el token de JWT
            let tokenUser = jwt.sign(
              {
                email,
              },
              "stw_2023!",
              { expiresIn: "48h" }
            );
            //Lo metemos en la BD
            const posdata_token = {
              email:email,
              tokenAuth:tokenUser
            }
            TokenAuth.create(posdata_token, function () {
              res.status(200);
            });
            jsonResponse = {
              status: "Successful",
              email: postdata.email,
              tokenUser: tokenUser,
              tokenAdmin:""
            };
            res.status(200).json(jsonResponse);
            logger.info(`Se ha iniciado sesión correctamente para el usuario con email ${postdata.email} en la llamada a ${path}`);
            return true;
          } else {
              if (banned){
                res.status(401).json("El usuario no existe o ha eliminado su cuenta");
                logger.warn(`El email ${postdata.email} no existe en la base de datos o esta baneado en la llamada a ${path}`);

                return false;
              }else{
                res.status(401).json("Email o contraseña incorrectos...");
                logger.warn(`El email ${postdata.email} no existe en la base de datos en la llamada a ${path}`);
                return false;
              }
          }
        } else if (response.status === 404) {
          res.status(404).json(response.data);
        } else {
          res.status(400).send("El formato de usuario es incorrecto...");
          logger.warn(`El email ${postdata.email} no es valido en la llamada a ${path}`);
          return false;
        }
      })
      .catch((error) => {
        logger.error(`Ha ocurrido un error y no se pudo iniciar sesión para el email ${postdata.email}: ${error}`);
      });
  }
};

/* nextLogin */
const nextLogin = function (req, res) {
  const path = "/api/nextLogin";
  const url = apiOptions.server + path;
  const postdata = {
    email: req.body.email,
    provider: req.body.provider
  };

  axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        logger.info(`Se ha logueado correctamente al usuario con email ${postdata.email} en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido loguear al usuario con email ${postdata.email} en la llamada a ${path}`);
        res
          .status(404)
          .send("No se ha podido loguear al usuario");
      }
    })
    .catch((error) => {
      logger.error(`Ha ocurrido un error mientras se logueaba al usuario ${postdata.email}: ${error} en la llamada a ${path}`);

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
        logger.info(`Se ha baneado correctamente al usuario con email ${postdata.email} en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido banear al usuario con email ${postdata.email} en la llamada a ${path}`);
        res
          .status(404)
          .send("No se ha podido eliminar/bannear al usuario");
      }
    })
    .catch((error) => {
      logger.error(`Ha ocurrido un error mientras se baneaba al usuario ${postdata.email}: ${error} en la llamada a ${path}`);

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
        logger.info(`Se ha desbaneado correctamente al usuario con email ${postdata.email} en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido desbanear al usuario con email ${postdata.email} en la llamada a ${path}`);
        res
          .status(404)
          .send("No se ha podido desbanear al usuario");
      }
    })
    .catch((error) => {
      logger.error(`Ha ocurrido un error mientras se desbaneaba al usuario ${postdata.email}: ${error} en la llamada a ${path}`);

    });
};

/* GET users */
const getBannedUsers = function (req, res) {
  const path = "/api/banUsers";
  const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de usuarios baneados correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    } else {
      logger.warn(`No se ha podido recuperar la lista de usuarios baneados correctamente en la llamada a ${path}`);
      res.status(404).send("No hemos encontrado ningún usuario baneado...");
    }
  });
};

/* SAVE airports */
const saveAirports = function (req, res) {
  const path = "/api/saveAirports";
  const url = apiOptions.server + path;

  const postdata = {
    email: req.body.email,
    iata: req.body.iata,
  };

  if (!postdata.email || !postdata.iata) {
    logger.warn(`No se ha especificado el email o el IATA en la llamada a ${path}. Imposible introducir en BD`);

    res.status(404).send("Faltan campos. Imposible guardar");
  } else {
    axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        res.status(200).json(response.data);
        logger.info(`Se ha introducido correctamente el aeropuerto ${postdata.iata} como favorito del usuario ${postdata.email} en la llamada a ${path}`);
      } else {
        logger.warn(`No hemos encontrado ningun usuario con el email ${postdata.email} en la llamada a ${path}`);
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
       logger.warn(`Se ha producido un error en la llamada a ${path}: ${error}`);
    });
  }
}

/* DELETE fav airports */
const deleteFavAirports = function (req, res) {
  const path = "/api/deleteFavAirports";
  const url = apiOptions.server + path;

  const postdata = {
    email: req.body.email,
    iata: req.body.iata,
  };

  if (!postdata.email || !postdata.iata) {
    logger.warn(`No se ha especificado el email o el IATA en la llamada a ${path}. Imposible eliminar de la BD`);
    res.status(404).send("Faltan campos. Imposible eliminar");
  } else {
    axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        res.status(200).json(response.data);
        logger.info(`Se ha eliminado correctamente el aeropuerto ${postdata.iata} como favorito del usuario ${postdata.email} en la llamada a ${path}`);
      } else {
        logger.warn(`No hemos encontrado ningun usuario con el email ${postdata.email} en la llamada a ${path}`);
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
       logger.warn(`Se ha producido un error en la llamada a ${path}: ${error}`);
    });
  }
}

const getFavAirports = function (req, res) {
  console.log("Entro aqui")
  const path = `/api/getFavAirports/${req.params.email}`;
  const url = apiOptions.server + path;

  axios
    .get(url, {})
    .then((response) => {
      if (response.data) {
        logger.info(`Se ha recuperado la lista de aeropuertos correctamente en la llamada a ${path}`);
        res.status(200).json(response.data);
      } else {
        logger.warn(`No se ha podido recuperar la lista de aeropuertos correctamente en la llamada a ${path}`);
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
      logger.error(`Error al recuperar los aeropuertos en la llamada a ${path}: ${error}`);
    });
};

/* CREATE TOPICS */
const createTopics = function (req, res) {
  const path = "/api/createTopics";
  const url = apiOptions.server + path;

  const postdata = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  };

  axios
    .post(url, postdata)
    .then((response) => {
      if (response.data.length > 0) {
        res.status(200).json(response.data);
        logger.info(`Se ha creado el topico correctamente en la llamada a ${path}`);
      } else {
        logger.warn(`No se ha podido crear el topico correctamente en la llamada a ${path}`);

        res
          .status(404)
          .send("No se ha podido crear el tema");
      }
    })
    .catch((error) => {
      logger.error(`Se ha producido un error en la llamada a ${path}`);

    });
};


const getUsersByCountryForUsers = async (req, res) => {
  const path = '/api/getUsersByCountryForUsers';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de usuarios por pais correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    }else{
      logger.info(`No se ha podido recuperar la lista de usuarios por pais correctamente en la llamada a ${path}`);
      res.status(400).json("No se ha podido recuperar la lista de usuarios por pais");

    }
  })
  .catch((error) => {
    logger.error(`Error al recuperar la lista de usuarios por pais: ${error.message} en la llamada a ${path}`);
  });
};

const getAirportsByNumberOfSaves = async (req, res) => {
  const path = '/api/getAirportsByNumberOfSaves';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de aeropuertos por número de veces guardados en favoritos correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    }else{
      logger.info(`No se ha podido recuperar la lista de aeropuertos por número de veces guardados en favoritos correctamente en la llamada a ${path}`);
      res.status(400).json("No se ha podido recuperar la lista de aeropuertos por número de veces guardados en favoritos");

    }
  })
  .catch((error) => {
    logger.error(`Error al recuperar la lista de aeropuertos por número de veces guardados en favoritos: ${error.message} en la llamada a ${path}`);
  });
};


module.exports = {
  getUsers,
  postUsers,
  getUsersByEmail,
  resetPasswordByEmail,
  loginUsers,
  nextLogin,
  banUsers,
  unBanUsers,
  getBannedUsers,
  resetPassword,
  saveAirports,
  deleteFavAirports,
  getFavAirports,
  createTopics,
  verifyToken,
  getUsersByCountryForUsers,
  getAirportsByNumberOfSaves
};
