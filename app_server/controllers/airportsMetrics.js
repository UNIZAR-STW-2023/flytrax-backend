const axios = require("axios");
const logger = require('../utils/logger');


const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};

const getFlightsEachDay = async (req, res) => {
  console.log("Entro en la cocurrencia por dia")
  const path = `/api/getFlightsEachDay/${req.params.iata}`
    const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    } else {

    }
  }).catch((error) => {
    logger.error(`Error en la llamada a ${path}: ${error.message}`);
  });



};

const getFlightsDelayedLastWeek = async (req, res) => {
  console.log("Entro en la concurrencia")
  const path = `/api/getFlightsDelayedLastWeek/${req.params.iata}`
    const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    } else {

    }
  }).catch((error) => {
    logger.error(`Error en la llamada a ${path}: ${error.message}`);
  });



};



module.exports = {
  getFlightsEachDay,
  getFlightsDelayedLastWeek
};

