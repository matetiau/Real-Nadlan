var express = require('express');
var router = express.Router();


// Bring user route
User = require('../models/user');


// Register form
router.get('/user',function(res,req){
    res.render('reg');
});




module.exports = router;
