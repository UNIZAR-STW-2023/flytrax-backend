const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlForo = require('../controllers/foro');
const ctrlUserMetrics = require('../controllers/usersMetrics');
const ctrlAirportsMetrics = require('../controllers/airportsMetrics');


//Users
router
  .route('/users')
  .get(ctrlUsers.getUsers)
  .post(ctrlUsers.postUsers)

router
  .route('/usersByEmail/:email') 
  .get(ctrlUsers.getUsersByEmail);

router
  .route('/resetPasswordByEmail/:email')
  .post(ctrlUsers.resetPasswordByEmail);

router
  .route('/loginUsers')
  .post(ctrlUsers.loginUsers);

router
  .route('/resetPassword')
  .post(ctrlUsers.resetPassword);


router
  .route('/banUsers')
  .post(ctrlUsers.banUsers)
  .get(ctrlUsers.getBannedUsers);


router
  .route('/unBanUsers')
  .post(ctrlUsers.unBanUsers);

//Foro
router
  .route('/createTopics')
  .post(ctrlForo.createTopics);
  
router
  .route('/createAnswers')
  .post(ctrlForo.createAnswers);

router
  .route('/topics')
  .get(ctrlForo.getTopics)

router
  .route('/getAnswersByTopic/:topicId')
  .get(ctrlForo.getAnswersByTopic);

router
    .route('/getTopicsByIata/:iata')
    .get(ctrlForo.getTopicsByIata);


//AirLabs
router
  .route('/saveAirports')
  .post(ctrlUsers.saveAirports);

//Airports Metrics
router
    .route('/getConcurrencyByAirport/:iata')
    .get(ctrlAirportsMetrics.getConcurrencyByAirport);


//User Metrics
router
  .route('/getUsersByGenre')
  .get(ctrlUserMetrics.getUsersByGenre)

router
  .route('/getBannedUsers')
  .get(ctrlUserMetrics.getBannedUsers)

router
  .route('/getUsersBannedByGenre')
  .get(ctrlUserMetrics.getBannedUsersByGenre)

router
  .route('/getUsersByAgeRange')
  .get(ctrlUserMetrics.getUsersByAgeRange)

router
  .route('/getUsersByCountry')
  .get(ctrlUserMetrics.getUsersByCountry)

router
  .route('/getUsersRegisteredByPeriod')
  .get(ctrlUserMetrics.getUsersRegisteredByPeriod)


  


module.exports = router;