const axios = require("axios");
const logger = require('../utils/logger');


const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};

const getConcurrencyByAirport = async (req, res) => {
  console.log("Entro en la concurrencia")
  const path = `/api/getConcurrencyByAirport/${req.params.iata}`
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
  getConcurrencyByAirport
};

