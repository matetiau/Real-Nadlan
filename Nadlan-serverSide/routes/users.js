var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Bring user route
let User = require('../models/user');


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });




// Register form

router.get('/register', (req, res) => {
    
    
    res.render('reg');
    
  });

  
  router.post('/register',urlencodedParser, (req, res,next) => {
    

    User.getUsers(function(err, users){
      if(err){
          throw err;
      } 
      let list = users;
      
      
      
      
     

   
    const  email = req.body.email;
    const  password = req.body.password;
    const  password2 = req.body.password2;
    const  username = req.body.username;
    
   // check for duplicate username
   const duplicateUserName = list.filter(h => h.username === username );
   const duplicateEmail = list.filter(h => h.email === email);
   
  
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody(duplicateUserName, 'Username already exists').isLength(1);
    req.checkBody(duplicateEmail, 'Email already exists').isLength(1);
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    

    if(errors){
      res.render('reg', {
        errors:errors
      });
      
    } else {
      let newUser = new User({
        
        email:email,
        username:username,
        password:password
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            if(err){
              throw err;
            }
            newUser.password = hash; 
            newUser.save(function(err, newUser){
              if(err){
                  throw err;
              } else { 
                req.flash('success', 'You are now registred log in')
                res.redirect('/users/login');
              }});
        });
    });
    }
  }); });
    
      
  

     
        
    
// get all users




 
  
  
  
  // login
  router.get('/login', (req, res) => {
    res.render('login');
    
  });

  // login post
  router.post('/login', function(req, res,next) {
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/users/login',
      failureFlash: true
    })(req,res,next);
  });

  
  //log out

  
  //remove user from db

  
module.exports = router;
