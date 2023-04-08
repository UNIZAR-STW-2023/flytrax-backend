var express = require('express');
var router = express.Router();
const ctrlUsers = require("../controllers/users");
const ctrlForo = require("../controllers/foro");

router
    .route('/users')
    .get(ctrlUsers.getUsers)
    .post(ctrlUsers.postUsers);

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

//AirLabs
router
    .route('/saveAirports')
    .post(ctrlUsers.saveAirports);

module.exports = router;
        