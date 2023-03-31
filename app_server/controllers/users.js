const axios = require('axios');
const bcrypt = require('bcrypt')

const apiOptions = {
  server : 'http://localhost:3000'
};
const saltRounds = 10;


/* GET users */
const getUsers = function(req, res){
  console.log("Entro a getUsersssssss")

    const path = '/api/users';
    const url = apiOptions.server + path;

    axios.get(url, {}).then((response) => {
        if (response.data.length > 0) {
            res.status(200).json(response.data);
        }
        else{
            res.status(404).send("No hemos encontrado ningún usuario...");
        }
    });
};

/* POST users */
const postUsers = function(req, res) {
  console.log("Entro a postUserssssssss")
    const path = '/api/users';
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
      gender: req.body.gender
    };
    console.log("Esto es el postdata: ", postdata)

    if (!postdata.name || !postdata.surname || !postdata.nickname || !postdata.email || !postdata.dateOfBirth 
      || !postdata.phone || !postdata.country || !postdata.gender || !postdata.password) {
      res.status(404).send("El formato de usuario es incorrecto1...");
    } else {
      axios.post(url, postdata)
      .then((response) => {
        if (response.status === 200) {
          res.status(200).json(response.data);
        }
        else if(response.status === 500){
          console.log("Entro aquí");
        }
        else {
          res.status(400).send("El formato de usuario es incorrecto2...");
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });

    }
  };

  /* POST users */
const loginUsers = function(req, res) {
    const path = '/api/loginUsers';
    const url = apiOptions.server + path;

    const postdata = {
      email: req.body.email,
      password: req.body.password
    };

    console.log("Esto es el postdata: ", postdata)

    if (!postdata.email) {
      res.status(404).send("El email es incorrecto1...");
    } else {
      axios.get(url, postdata)
      .then((response) => {
        console.log("me han respondido desde api interna")
        if (response.status === 200) {
          passwordRecovered = response.data;
          if (bcrypt.compareSync(postdata.password, passwordRecovered)){
            res.status(200).json("Login sucessful");
          }
        }
        else if(response.status === 500){
          console.log("Entro aquí");
        }
        else {
          res.status(400).send("El formato de usuario es incorrecto2...");
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });

    }
  };

  

module.exports = {
    getUsers,
    postUsers,
    loginUsers
};

