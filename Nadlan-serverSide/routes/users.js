var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var flash = require('express-flash-messages');
mongoose.connect('mongodb://localhost/housestore');

// Bring user route
let User = require('../models/user');


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });




// Register form

router.get('/register', (req, res) => {
    res.render('reg');
    
  });

  
  router.post('/register',urlencodedParser, (req, res) => {
  
    const  name = req.body.name;
    const  email = req.body.email;
    const password = req.body.password;
    const  password2 = req.body.password2;
    const  username = req.body.username;
    
  
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


      let newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
      });
    
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;

            User.addUser(newUser, function(err, newUser){
              if(err){
                  throw err;
              } else { 
                req.flash('success', 'יש לך חשבון אתה יכול להתחבר')
                res.redirect('/users/login');
              }});
        });
    });
  

     
        
    
    
   
  
      });
  
  
  
  // login
  router.get('/login', (req, res) => {
    res.render('login');
    
  });
  
  
module.exports = router;
