var express = require('express');
var router = express.Router();
const ctrlUsers = require("../controllers/users");
const ctrlForo = require("../controllers/foro");
const ctrlAdmin = require("../controllers/admin");


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

//AirLabs
router
    .route('/saveAirports')
    .post(ctrlUsers.verifyToken, ctrlUsers.saveAirports);

module.exports = router;
        