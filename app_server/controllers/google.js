const axios = require("axios");


const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};

/* GET users */
const googleAuth = function (req, res) {
    const path = "/api/google";
    const url = apiOptions.server + path;
  
    axios.get(url, passport.authenticate('google', { scope: ['profile', 'email'] })).then((response) => {
      if (response.data.length > 0) {
        res.status(200).json(response.data);
      } else {
        res.status(404).send("No hemos encontrado ningún usuario...");
      }
    });
  };

const googleAuthCallback = function (req, res) {
    const path = "/api/google";
    const url = apiOptions.server + path;
  
    axios.get(url, passport.authenticate('google', { failureRedirect: '/login' }),function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      }).then((response) => {
      if (response.data.length > 0) {
        res.status(200).json(response.data);
      } else {
        res.status(404).send("No hemos encontrado ningún usuario...");
      }
    });
  };

module.exports = {
    googleAuth,
    googleAuthCallback,
  };