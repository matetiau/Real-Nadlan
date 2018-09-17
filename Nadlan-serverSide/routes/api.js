const express = require('express');
const router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


let reqPath = path.join(__dirname, '../public/html-files');



House = require('./models/house');


router.use(express.static('public'));
router.use(express.json());

mongoose.connect('mongodb://localhost/housestore');
var db = mongoose.connection;


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// parse application/json
router.use(bodyParser.json())


const accounts = [
   
];




      



//get all houses

   
router.get('/houses', function(req,res){
  House.getHouses(function(err, houses){
      if(err){
          throw err;
      } 
      let list = houses;
      res.json(houses);
      res.render('houses', {list:list});
  });
});

//get specific house 

router.get('/houses/:_id', function(req,res){
  House.getHouseById(req.params._id, function(err, house){
      if(err){
          throw err;
      } 
      
      const title = house.title;
      const types = house.types;
      const rooms = house.rooms;
      const area = house.area;
      const price = house.price;


      res.render('list', 
              {
              title:title ,
              type:types ,
              rooms:rooms ,
              area:area ,
              price : price + "שקל"

        
          
          });
    });
});







//delete house

router.delete('/houses/:_id', function(req,res){
  let id = req.params._id;
  House.removeHouse(id,function(err, house){
      if(err){
          throw err;
      } 
      res.json(house);
  });
});


// add new house 
router.post('/houses', function(req,res){
  var house = req.body;
  House.addHouse(house, function(err, house){
      if(err){
          throw err;
      } 
      res.json(house);
  });
});


//change house price 

router.put('/houses/:_id', function(req,res){
  var id = req.params._id;
  var house = req.body;
  House.updateHouse(id,house,{}, function(err, house){
      if(err){
          throw err;
      } 
      res.json(house);
  });
});



// registration


router.get('/log', (req, res) => {
  
  res.render('reg');
 
  
});


router.post('/log',urlencodedParser, (req, res) => {
  

  
  const account = {
    id: accounts.length +1,
    email: req.body.email,
    password: req.body.password
  }
  if (accounts.find(acc => acc.email === req.body.email  )){
    console.log('you have acc here ' + JSON.stringify(accounts));
    res.send({type:'you already have an account log in'});
  } else {
    accounts.push(account);
    console.log(JSON.stringify(accounts) + 'added');
    res.send({type:'new account created'});
  };


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








//registration


  module.exports = router;
