var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/housestore');

// Bring user route
User = require('../models/user');


// Register form

router.get('/register', (req, res) => {
    res.render('reg');
    
  });

  
  router.post('/register',urlencodedParser, (req, res) => {
    
    const account = {
      id: accounts.length +1,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    }

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    
   
  
  });
  
  
  
  // login
  router.get('/login',urlencodedParser, (req, res) => {
    res.render('login');
    
  });
  
  
  
  router.post('/login',urlencodedParser, (req, res) => {
  const acca = {
    email: req.body.email,
    password: req.body.password};
    
  
    if (accounts.find(acc =>acc.email === req.body.email && acc.password === req.body.password  )){
      res.send({type:"Logged in "});
      console.log('you are logged in');
      let log = true;}
      else {
        res.send({type:"incorrect"});
        console.log('there is no account like this or password is incorect');
        let log = false;}
      });
  
module.exports = router;
