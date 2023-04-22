const mongoose = require("mongoose");
const moment = require('moment');
const Users = mongoose.model("Users");
const Token = mongoose.model("Token");
const FavAirports = require('../models/favAirports');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../Utils/emails.js");
const Admins = require("../models/admins");

const bcryptSalt = 10;
const clientURL = "http://localhost:3000";
//const clientURL = "https://flytraxserver-758723.b4a.run";
//const clientURL = "https://flytrax-backend.vercel.app"

const getUsersByGenre = async (req, res) => {

  try {
    // Obtén todos los usuarios de la base de datos
    const users = await Users.find();
    
    // Calcula el total de usuarios y el número de usuarios por género
    let totalUsers = 0;
    let maleUsers = 0;
    let femaleUsers = 0;
    let nonbinaryUsers = 0;
    let nonespecificado = 0

    
    users.forEach(user => {
      if (user.gender.toLowerCase() === 'm') {
        maleUsers++;
      } else if (user.gender.toLowerCase() === 'f') {
        femaleUsers++;
      } else if(user.gender.toLowerCase() === 'nb') {
        nonbinaryUsers++;
      }else{
        nonespecificado++;
      }
    });
    
    totalUsers = maleUsers + femaleUsers + nonbinaryUsers + nonespecificado;
    
    // Calcula el porcentaje de usuarios por género
    const malePercentage = (maleUsers / totalUsers) * 100;
    const femalePercentage = (femaleUsers / totalUsers) * 100;
    const nonbinaryPercentage = (nonbinaryUsers / totalUsers) * 100;
    const nonespecificadoPercentage = (nonespecificado / totalUsers) * 100;

    // Envía la respuesta al cliente con los porcentajes de usuarios por género
    res.json({
      "male": malePercentage,
      "female" :femalePercentage,
      "nonbinary" : nonbinaryPercentage,
      "nonespecificado" : nonespecificadoPercentage
    });
  } catch (err) {

    res.status(500).send('Server Error');
  }
};

const getBannedUsers = async (req, res) => {
    // Obtén todos los usuarios baneados de la base de datos
    const bannedUsers = await Users.find({ banned: true });
    
    // Calcula el total de usuarios y el número de usuarios baneados
    const totalUsers = await Users.countDocuments();
    const bannedUsersCount = bannedUsers.length;
    
    // Calcula el porcentaje de usuarios baneados
    const bannedPercentage = (bannedUsersCount / totalUsers) * 100;

    // Envía la respuesta al cliente con el porcentaje de usuarios baneados
    res.json({
      "bannedPercentage": bannedPercentage,
      "unbannedPercentage":100-bannedPercentage
    });
};

const getBannedUsersByGenre = async (req, res) => {
    // Obtén todos los usuarios baneados de la base de datos
    const bannedUsers = await Users.find({ banned: true });
    
    // Calcula el total de usuarios y el número de usuarios por género
    let totalUsers = 0;
    let maleUsers = 0;
    let femaleUsers = 0;
    let nonbinaryUsers = 0;
    let nonespecificado = 0;

    bannedUsers.forEach(user => {
      if (user.gender.toLowerCase() === 'm') {
        maleUsers++;
      } else if (user.gender.toLowerCase() === 'f') {
        femaleUsers++;
      } else if(user.gender.toLowerCase() === 'nb') {
        nonbinaryUsers++;
      }else{
        nonespecificado++;
      }
    });
    
    totalUsers = maleUsers + femaleUsers + nonbinaryUsers + nonespecificado;
    
    // Calcula el porcentaje de usuarios por género
    const malePercentage = (maleUsers / totalUsers) * 100;
    const femalePercentage = (femaleUsers / totalUsers) * 100;
    const nonbinaryPercentage = (nonbinaryUsers / totalUsers) * 100;
    const nonespecificadoPercentage = (nonespecificado / totalUsers) * 100;

    // Envía la respuesta al cliente con los porcentajes de usuarios por género baneados
    res.json({
      "male": malePercentage,
      "female" :femalePercentage,
      "nonbinary" : nonbinaryPercentage,
      "nonespecificado" : nonespecificadoPercentage
    });
};

const getUsersByAgeRange = async (req, res) => {
  try {
    // Obtén todos los usuarios de la base de datos
    const users = await Users.find();

    // Define los rangos de edad que nos interesa analizar
    const ageRanges = [
      { min: 0, max: 17, label: 'Menores de edad' },
      { min: 18, max: 24, label: '18-24 años' },
      { min: 25, max: 34, label: '25-34 años' },
      { min: 35, max: 44, label: '35-44 años' },
      { min: 45, max: 54, label: '45-54 años' },
      { min: 55, max: 64, label: '55-64 años' },
      { min: 65, max: 200, label: 'Mayores de 64 años' },
    ];

    // Inicializa un objeto para almacenar la suma de edades y el número de usuarios en cada rango de edad
    const ageData = ageRanges.reduce((acc, range) => {
      acc[range.label] = {
        count: 0
      };
      return acc;
    }, {});

    // Calcula la edad de cada usuario y actualiza los datos de edad correspondientes
    users.forEach(user => {
      const userDateOfBirth = user.dateOfBirth;
      const age = moment().diff(moment(userDateOfBirth, 'DD/MM/YYYY'), 'years');


      

      // Suma la edad del usuario a la categoría correspondiente
      for (const range of ageRanges) {
        if (age >= range.min && age <= range.max) {
          ageData[range.label].count++;
        }
      }
    });



    // Envía la respuesta al cliente con los datos de edad
    res.json({
      ageData,
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getUsersByCountry = async (req, res) => {
    // Obtén todos los usuarios de la base de datos
    const users = await Users.find();
    
    // Crea un objeto vacío para almacenar los conteos de usuarios por país
    let usersByCountry = {};
    
    // Recorre cada usuario y obtén el país de origen del usuario
    users.forEach(user => {
      const country = user.country;
      
      // Si el país de origen del usuario ya existe en el objeto de conteo, incrementa su valor en uno. De lo contrario, crea una nueva clave en el objeto de conteo con un valor de 1.
      if (usersByCountry.hasOwnProperty(country)) {
        usersByCountry[country]++;
      } else {
        usersByCountry[country] = 1;
      }
    });
    
    // Envía la respuesta al cliente con los conteos de usuarios por país
    res.json(usersByCountry);

};

const getUsersRegisteredByPeriod = async (req, res) => {
  try {
    // Obtener la fecha de inicio
    const startDate = new Date("2023-04-10T00:00:00Z");

    // Obtener la fecha actual
    const currentDate = new Date();

    // Calcular la diferencia de tiempo en milisegundos
    const timeDiff = currentDate.getTime() - startDate.getTime();

    // Convertir la diferencia de tiempo en semanas y redondear hacia abajo
    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    // Calcular la fecha final sumando el número de semanas redondeado a la fecha de inicio
    const endDate = new Date(startDate.getTime() + (weeksDiff * 7 * 24 * 60 * 60 * 1000));

    // Iterar sobre el número de semanas redondeado y contar el número de usuarios registrados en cada semana
    const users = await Users.find();
    const usersByWeek = {};
    for (let i = 0; i < weeksDiff; i++) {
      const start = new Date(startDate.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
      const end = new Date(start.getTime() + (7 * 24 * 60 * 60 * 1000));
      const usersRegistered = users.filter(user => {
        const userDate = new Date(user.registerDate);
        return userDate >= start && userDate < end;
      }).length;
      usersByWeek[`${start.toLocaleDateString()}-${end.toLocaleDateString()}`] = usersRegistered;
    }

    // Enviar el objeto JSON con los resultados
    res.json(usersByWeek);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getUsersByGenre,
  getBannedUsers,
  getBannedUsersByGenre,
  getUsersByAgeRange,
  getUsersByCountry,
  getUsersRegisteredByPeriod
};
