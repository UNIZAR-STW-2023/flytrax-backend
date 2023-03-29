const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');

// users
router
  .route('/users')
  .get(ctrlUsers.getUsers)
  //.post(ctrlUsers.postUsers);

module.exports = router;