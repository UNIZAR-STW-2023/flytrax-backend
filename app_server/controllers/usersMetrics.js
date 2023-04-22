const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenAuth = require('../../app_api/models/tokenAuth');
const Admins = require("../../app_api/models/admins");

const apiOptions = {
  server: "http://localhost:3000",
  //server : 'https://flytrax-backend.vercel.app' 
};
const saltRounds = 10;

const getUsersByGenre = async (req, res) => {
  const path = '/api/getUsersByGenre';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });



};

const getBannedUsers = async (req, res) => {
  const path = '/api/getBannedUsers';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
};

const getBannedUsersByGenre = async (req, res) => {
  const path = '/api/getUsersBannedByGenre';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
};

const getUsersByAgeRange = async (req, res) => {
  const path = '/api/getUsersByAgeRange';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
};

const getUsersByCountry = async (req, res) => {
  const path = '/api/getUsersByCountry';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
};

const getUsersRegisteredByPeriod = async (req, res) => {
  const path = '/api/getUsersRegisteredByPeriod';
  const url = apiOptions.server + path;

  axios
  .get(url, {})
  .then((response) => {
    if (response.data) {
      res.status(200).json(response.data);
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
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

