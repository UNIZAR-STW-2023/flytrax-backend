const mongoose = require("mongoose");
const moment = require('moment');
const Users = mongoose.model("Users");

//const clientURL = "http://localhost:3000";
const clientURL = "https://flytrax-backend.vercel.app"
//const clientURL = "flytrax-backend-production.up.railway.app"

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
    const bannedUsers = await Users.find({ banned: true });
        const totalUsers = await Users.countDocuments();
    const bannedUsersCount = bannedUsers.length;
    
    const bannedPercentage = (bannedUsersCount / totalUsers) * 100;

    // Envía la respuesta al cliente con el porcentaje de usuarios baneados
    res.json({
      "bannedPercentage": bannedPercentage,
      "unbannedPercentage":100-bannedPercentage
    });
};

const getBannedUsersByGenre = async (req, res) => {
    const bannedUsers = await Users.find({ banned: true });
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
    
    const malePercentage = (maleUsers / totalUsers) * 100;
    const femalePercentage = (femaleUsers / totalUsers) * 100;
    const nonbinaryPercentage = (nonbinaryUsers / totalUsers) * 100;
    const nonespecificadoPercentage = (nonespecificado / totalUsers) * 100;
    res.json({
      "male": malePercentage,
      "female" :femalePercentage,
      "nonbinary" : nonbinaryPercentage,
      "nonespecificado" : nonespecificadoPercentage
    });
};

const getUsersByAgeRange = async (req, res) => {
  try {
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

    const ageData = ageRanges.reduce((acc, range) => {
      acc[range.label] = {
        count: 0
      };
      return acc;
    }, {});
    users.forEach(user => {
      const userDateOfBirth = user.dateOfBirth;
      const age = moment().diff(moment(userDateOfBirth, 'DD/MM/YYYY'), 'years')

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
    const users = await Users.find();
    
    let usersByCountry = {};
    
    users.forEach(user => {
      const country = user.country;
      
      if (usersByCountry.hasOwnProperty(country)) {
        usersByCountry[country]++;
      } else {
        usersByCountry[country] = 1;
      }
    });
    
    res.json(usersByCountry);

};

const getUsersRegisteredByPeriod = async (req, res) => {
  try {
    const startDate = new Date("2023-04-10T00:00:00Z");

    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - startDate.getTime();

    const weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

    const endDate = new Date(startDate.getTime() + (weeksDiff * 7 * 24 * 60 * 60 * 1000));

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
