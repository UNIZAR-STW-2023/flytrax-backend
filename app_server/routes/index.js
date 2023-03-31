var express = require('express');
var router = express.Router();
const ctrlUsers = require("../controllers/users");

router
    .route('/users')
    .get(ctrlUsers.getUsers)
    .post(ctrlUsers.postUsers);

//Función todavía no funcionando correctamente
router
    .route('/usersByEmail/:email')
    .get(ctrlUsers.getUsersByEmail);

router
    .route('/loginUsers')
    .get(ctrlUsers.loginUsers);


module.exports = router;
        