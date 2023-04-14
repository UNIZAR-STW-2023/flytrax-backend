const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const apiOptions = {
  //server: "http://localhost:3000",
  /* server : 'https://flytraxserver-758723.b4a.run' */
  server: "https://flytrax-backend.vercel.app"
};
const saltRounds = 10;

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
          res.status(200).json(response.data);
        } else if (response.status === 500) {
          res.status(500).json(response.data);
        } else {
          res.status(400).send("El formato de usuario es incorrecto...");
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
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
      } else {
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
};

/* RESET password BY email*/
const resetPasswordByEmail = async function (req, res) {
  const path = `/api/resetPasswordByEmail/${req.params.email}`;
  const url = apiOptions.server + path;

  await axios
    .post(url, {})
    .then((response) => {
      console.log("Lo que me devuelve es: ", response.data);
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
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
      } else {
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
};

/* LOGIN users */
const loginUsers = function (req, res) {
  const path = "/api/loginUsers";
  const url = apiOptions.server + path;

  const postdata = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!postdata.email) {
    res.status(404).send("El email es incorrecto...");
  } else {
    axios
      .post(url, postdata)
      .then((response) => {
        if (response.status === 200) {
          passwordRecovered = response.data.password;
          banned = response.data.banned
          if (bcrypt.compareSync(postdata.password, passwordRecovered) && !banned) {
            //Creamos el token de JWT
            email = postdata.email;
            let token = jwt.sign(
              {
                email,
              },
              "stw2023",
              { expiresIn: "48h" }
            );

            jsonResponse = {
              status: "Sucessful",
              email: postdata.email,
              token: token,
            };
            res.status(200).json(jsonResponse);
          } else {
              if (banned){
                res.status(401).json("El usuario no existe o ha eliminado su cuenta");
              }else{
                res.status(401).json("Email o contraseña incorrectos...");
              }
          }
        } else if (response.status === 500) {
          res.status(500).json(response.data);
        } else {
          res.status(400).send("El formato de usuario es incorrecto...");
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  }
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
      console.error(`Error: ${error.message}`);
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
      console.error(`Error: ${error.message}`);
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

/* SAVE airports */
const saveAirports = function (req, res) {
  const path = "/api/saveAirports";
  const url = apiOptions.server + path;

  const postdata = {
    email: req.body.email,
    iata: req.body.iata,
  };

  if (!postdata.email || !postdata.iata) {
    res.status(404).send("Faltan campos. Imposible guardar");
  } else {
    axios
    .post(url, postdata)
    .then((response) => {
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .send("No hemos encontrado ningún usuario con ese email...");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
  }
}

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
      } else {
        res
          .status(404)
          .send("No se ha podido crear el tema");
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
};


module.exports = {
  getUsers,
  postUsers,
  getUsersByEmail,
  resetPasswordByEmail,
  loginUsers,
  banUsers,
  unBanUsers,
  getBannedUsers,
  resetPassword,
  saveAirports,
  createTopics
};
