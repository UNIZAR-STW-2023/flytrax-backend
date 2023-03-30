const axios = require('axios');
const apiOptions = {
  server : 'http://localhost:3000'
};

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
    const postdata = {
      name: req.body.name,
      surname: req.body.surname,
      nickname: req.body.nickname
    };
    console.log("Esto es el nombre:", req.body.name)
    console.log("Esto es el apellido:", req.body.surname)
    console.log("Esto es el nickname:", req.body.nickname)
    if (!postdata.name || !postdata.surname || !postdata.nickname) {
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

module.exports = {
    getUsers,
    postUsers
};

