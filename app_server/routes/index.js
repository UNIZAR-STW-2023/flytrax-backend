var express = require('express');
var router = express.Router();
const ctrlUsers = require("../controllers/users");
const ctrlForo = require("../controllers/foro");
const ctrlAdmin = require("../controllers/admin");
const ctrlUserMetrics = require("../controllers/usersMetrics");
const ctrlAirportsMetrics = require("../controllers/airportsMetrics");


//Users
router
    .route('/users')
    .get(ctrlAdmin.verifyToken, ctrlUsers.getUsers) //Esta es solo para el admin
    .post(ctrlUsers.postUsers);

router
    .route('/usersByEmail/:email')
    .get(ctrlUsers.verifyToken, ctrlUsers.getUsersByEmail);

router
    .route('/resetPasswordByEmail/:email')
    .post(ctrlUsers.verifyToken, ctrlUsers.resetPasswordByEmail);

router
    .route('/loginUsers')
    .post(ctrlUsers.loginUsers);

router
    .route('/resetPassword')
    .post(ctrlUsers.verifyToken, ctrlUsers.resetPassword);

router
    .route('/banUsers')
    .post(ctrlUsers.verifyToken, ctrlUsers.banUsers)
    .get(ctrlUsers.verifyToken, ctrlUsers.getBannedUsers);

router
    .route('/unBanUsers')
    .post(ctrlUsers.verifyToken, ctrlUsers.unBanUsers);

//Airports Metrics

router
    .route('/getConcurrencyByAirport/:iata')
    .get(ctrlAirportsMetrics.getConcurrencyByAirport);

    
//Foro
router
  .route('/createTopics')
  .post(ctrlUsers.verifyToken, ctrlForo.createTopics);

router
  .route('/createAnswers')
  .post(ctrlUsers.verifyToken, ctrlForo.createAnswers);

router
  .route('/topics')
  .get(ctrlUsers.verifyToken, ctrlForo.getTopics)

router
    .route('/getAnswersByTopic/:topicId')
    .get(ctrlUsers.verifyToken, ctrlForo.getAnswersByTopic);

router
    .route('/getTopicsByIata/:iata')
    .get(ctrlUsers.verifyToken, ctrlForo.getTopicsByIata);

//AirLabs
router
    .route('/saveAirports')
    .post(ctrlUsers.verifyToken, ctrlUsers.saveAirports);

//User Metrics
router
  .route('/getUsersByGenre')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByGenre)

router
  .route('/getUsersBanned')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getBannedUsers)

router
  .route('/getUsersBannedByGenre')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getBannedUsersByGenre)

router
  .route('/getUsersByAgeRange')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByAgeRange)

router
  .route('/getUsersByCountry')
  .get(ctrlAdmin.verifyToken,ctrlUserMetrics.getUsersByCountry)

router
  .route('/getUsersRegisteredByPeriod')
  .get(ctrlAdmin.verifyToken, ctrlUserMetrics.getUsersRegisteredByPeriod)

//Stats for users
router
  .route('/getUsersByCountryForUsers')
  .get(ctrlUsers.verifyToken, ctrlUsers.getUsersByCountryForUsers)

router
  .route('/getAirportsByNumberOfSaves')
  .get(ctrlUsers.verifyToken, ctrlUsers.getAirportsByNumberOfSaves)


module.exports = router;
        