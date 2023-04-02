const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');

// users
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

module.exports = router;