var express = require('express');
var router = express.Router();
const ctrlUsers = require("../controllers/users");

router
    .route('/users')
    .get(ctrlUsers.getUsers)
    .post(ctrlUsers.postUsers);

module.exports = router;
        