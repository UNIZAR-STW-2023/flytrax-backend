/*
  File's name: airportsMetrics.js
  Authors: Sergio Hernández & Jorge Bernal 
  Date: 16/05/2023
*/

const axios = require("axios");
const logger = require('../utils/logger');


const apiOptions = {
 //server: "http://localhost:3000",
  server : 'https://flytrax-backend.vercel.app' 
};

const getFlightsEachDay = async (req, res) => {
  console.log("Entro en la cocurrencia por dia")
  const path = `/api/getFlightsEachDay/${req.params.iata}`
    const url = apiOptions.server + path;

  axios.get(url, {}).then((response) => {
    if (response.data) {
      logger.info(`Se han obtenido los vuelos llegados al aeropuerto ${req.params.iata} en la llamada a ${path}`);
      res.status(200).json(response.data);
    } else {
      logger.warn(`No se han podido obtener los vuelos llegados al aeropuerto ${req.params.iata} en la llamada a ${path}`);

    }
  }).catch((error) => {
    logger.error(`Error en la llamada a ${path}: ${error.message}`);
  });



};


module.exports = {
  getFlightsEachDay,
};

