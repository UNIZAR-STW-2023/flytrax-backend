const axios = require("axios");
const moment = require('moment');

const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};

const getConcurrencyByAirport = async (req, res) => {
  const iata = req.params.iata;
  console.log(iata);

  const flightsByHour = {}; // objeto para almacenar los vuelos por hora
  const now = new Date(); // hora actual

  // Obtener la hora actual formateada en formato hh
  const formatted_hour = now.getHours().toString().padStart(2, '0');
  const hoy = now.toISOString().slice(0, 10);

  // Hacer la solicitud a la API
  axios.get('https://airlabs.co/api/v9/schedules?arr_iata=PMI&api_key=2709a68a-9e16-4c2b-9cd1-fc909726bc3d')
    .then(response => {
      const flights = response.data.response;

      // Iterar sobre todas las horas desde la hora actual hasta las próximas 24 horas
      for (let i = 0; i < 24; i++) {
        const hour = (now.getHours() + i) % 24; // calcula la hora del vuelo actual
        const hourString = hour.toString().padStart(2, '0'); // formatea la hora en formato hh

        // Filtrar los vuelos que salen en la hora actual
        const flightsForHour = flights.filter(flight => {
          const departureTime = new Date(flight.arr_time);
          const departureHour = departureTime.getHours().toString().padStart(2, '0');
          const departureDate = departureTime.toISOString().slice(0, 10);
          return departureHour === hourString && departureDate === hoy;
        });

        // Almacenar el número de vuelos para la hora actual
        flightsByHour[hourString] = flightsForHour.length;
      }

      console.log(flightsByHour);
    })
    .catch(error => {
      console.error('There was an error with the API request:', error);
    });
}

module.exports = {
  getConcurrencyByAirport
};

