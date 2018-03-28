var express = require('express');
var router = express.Router();

//Files routes
var translate = require('./translate/routes');

//Routes
router.use("/translate" , translate);

module.exports = router;