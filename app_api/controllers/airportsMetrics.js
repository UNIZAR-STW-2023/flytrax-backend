const axios = require("axios");
const moment = require('moment');

const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};

const getConcurrencyByAirport = async (req, res) => {
  const iata = req.params.iata;
  console.log(iata);

  const url = `https://airlabs.co/api/v9/schedules?api_key=2709a68a-9e16-4c2b-9cd1-fc909726bc3d&arr_iata=${iata}`;
  const airportConcurrence = {};

  try {
    const response = await axios.get(url);
    const data = response.data;
    //Procedemos a calcular la concurrencia por horas en 7 días atras...


// Obtener fecha de ayer
// Obtener la fecha actual
const today = new Date();

for (const flight of data.response) {
  const arrDate = new Date(flight.arr_time_utc);

  // Verificar si el vuelo es de hoy
  const isTodayFlight = arrDate.getDate() === today.getDate();

  if (isTodayFlight) {
    const arrHour = arrDate.getUTCHours();



    if (airportConcurrence[arrHour]) {
      airportConcurrence[arrHour].arrivals += 1;
    } else {
      airportConcurrence[arrHour] = {
        arrivals: 1,
      };
    }
  }
}

res.status(200).json(airportConcurrence)

  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error al obtener los datos');
  }
};



module.exports = {
  getConcurrencyByAirport
};

