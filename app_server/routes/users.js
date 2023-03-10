const ctrlRoot = require("../controllers/usersController");

var express = require('express');
var router = express.Router();

//router.get('/users', ctrlRoot.getUsers);
router.post('/createUser', ctrlRoot.createUser);

module.exports = router;


        