const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlForo = require('../controllers/foro');


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


//AirLabs
router
  .route('/saveAirports')
  .post(ctrlUsers.saveAirports);


module.exports = router;