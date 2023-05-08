const axios = require("axios");


const logger = require('../utils/logger');


const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};
const saltRounds = 10;

const getUsersByGenre = async (req, res) => {
  const path = '/api/getUsersByGenre';
  const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      logger.info(`Se han recuperado los usuarios por género correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    } else {
      logger.warn(`No se ha podido recuperar la lista de usuarios por género correctamente en la llamada a ${path}`);
      res.status(404).send("No hemos encontrado ningún usuario por género...");
    }
  }).catch((error) => {
    logger.error(`Error en la llamada a ${path}: ${error.message}`);
    res.status(500).send("Ha habido un error al recuperar los usuarios por género...");
  });



};

const getBannedUsers = async (req, res) => {
  const path = '/api/getBannedUsers';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de usuarios baneados correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    }else{
      logger.warn(`No se ha podido recuperar la lista de usuarios baneados correctamente en la llamada a ${path}`);
      res.status(400).json("No se ha podido recuperar la lista de usuarios baneados");
    }
  })
  .catch((error) => {
    logger.error(`Error al recuperar la lista de usuarios baneados: ${error.message} en la llamada a ${path}`);
  });
};

const getBannedUsersByGenre = async (req, res) => {
  const path = '/api/getUsersBannedByGenre';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de usuarios baneados por genero correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    }else{
      logger.warn(`No se ha podido recuperar la lista de usuarios baneados por genero correctamente en la llamada a ${path}`);
      res.status(400).json("No se ha podido recuperar la lista de usuarios baneados");

    }
  })
  .catch((error) => {
    logger.error(`Error al recuperar la lista de usuarios baneados por genero: ${error.message} en la llamada a ${path}`);
  });
};

const getUsersByAgeRange = async (req, res) => {
  const path = '/api/getUsersByAgeRange';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de usuarios por rango de edad correctamente en la llamada a ${path}`);
      res.status(200).json(response.data);
    }else{
      logger.warn(`No se ha recuperar la lista de usuarios por rango de edad correctamente en la llamada a ${path}`);
      res.status(400).json("No se ha podido recuperar la lista de usuarios por rango de edad");

    }
  })
  .catch((error) => {
    logger.error(`Error al recuperar la lista de usuarios por rango de edad: ${error.message} en la llamada a ${path}`);
  });
};

const getUsersByCountry = async (req, res) => {
  const path = '/api/getUsersByCountry';
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

const getUsersRegisteredByPeriod = async (req, res) => {
  const path = '/api/getUsersRegisteredByPeriod';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      logger.info(`Se ha recuperado la lista de usuarios por pais periodo de registro en la llamada a ${path}`);
      res.status(200).json(response.data);
    }else{
      logger.warn(`No se ha podido recuperar la lista de usuarios por pais periodo de registro en la llamada a ${path}`);
      res.status(400).json("No se ha podido recuperar la lista de usuarios por periodo de registro");
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    logger.error(`Error al recuperar la lista de usuarios por periodo de registro: ${error.message} en la llamada a ${path}`);
  });
};

module.exports = {
  getUsersByGenre,
  getBannedUsers,
  getBannedUsersByGenre,
  getUsersByAgeRange,
  getUsersByCountry,
  getUsersRegisteredByPeriod
};

