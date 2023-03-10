const ctrlRoot = require("../controllers/rootController");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ctrlRoot.servirRoot);

/*POST home page */
router.post('/', ctrlRoot.servirRoot);

module.exports = router;

