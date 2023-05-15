const axios = require("axios");

const apiOptions = {
  //server: "http://localhost:3000",
  server : 'https://flytrax-backend.vercel.app' 
  //server: 'flytrax-backend-production.up.railway.app'
};

const getFlightsEachDay = async (req, res) => {
  try {
    const responseArrival = await axios.get('https://airlabs.co/api/v9/routes', {
      params: {
        api_key: '9e6e981c-09fa-42df-91ba-fe4f0aacc4aa',
        arr_iata: req.params.iata
      }
    });

    const responseDeparture = await axios.get('https://airlabs.co/api/v9/routes', {
      params: {
        api_key: '9e6e981c-09fa-42df-91ba-fe4f0aacc4aa',
        dep_iata: req.params.iata
      }
    });

    const flightsArrival = responseArrival.data.response;
    const flightsDeparture = responseDeparture.data.response;

    const flightsByDay = {};

    flightsArrival.forEach((flight) => {
      flight.days.forEach((day) => {
        flightsByDay[day] = (flightsByDay[day] || 0) + 1;
      });
    });

    flightsDeparture.forEach((flight) => {
      flight.days.forEach((day) => {
        flightsByDay[day] = (flightsByDay[day] || 0) + 1;
      });
    });

    const orderedFlightsByDay = Object.fromEntries(
      Object.entries(flightsByDay).sort((a, b) => {
        const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        return daysOfWeek.indexOf(a[0]) - daysOfWeek.indexOf(b[0]);
      })
    );

    res.json(orderedFlightsByDay);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};




module.exports = {
  getFlightsEachDay,
};

