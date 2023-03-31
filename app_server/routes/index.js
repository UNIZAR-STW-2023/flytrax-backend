var express = require('express');
var router = express.Router();
const ctrlUsers = require("../controllers/users");

router
    .route('/users')
    .get(ctrlUsers.getUsers)
    .post(ctrlUsers.postUsers);

router
    .route('/loginUsers')
    .post(ctrlUsers.loginUsers);






module.exports = router;
        