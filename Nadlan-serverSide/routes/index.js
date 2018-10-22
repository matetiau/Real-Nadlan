const express = require('express');
const router = express.Router();

/* GET home page. */
router.use(express.static('public'));
router.use(express.json());
router.use('/api', require('./api'));
House = require('../models/house');




router.get('/logout', function(req, res){
    req.logout();
    
    res.redirect('/');
  });
  
router.get('/', function(req,res){
  House.getHouses(function(err, houses){
      if(err){
          throw err;
      } 
      if(houses.length>0){
      const host = req.headers.host; 
      
      let randomTwo = [];
      let randomItem = [];
        for (let i = 0;i<6;i++){
            let num = (houses[Math.floor(Math.random()*houses.length)]);
            if (!randomItem.includes(num)){
            randomItem.push(num);}}
      let superList = randomItem;
        for (let i = 0;i<6;i++){
            let num = (houses[Math.floor(Math.random()*houses.length)]);
            if (!randomItem.includes(num)){
            randomTwo.push(num);}}


      
      let list = randomTwo;
      res.render('index', {list:list,user:req.user,host:host,superList:superList});}
       else {
        res.render('index');
       }
  });
});

//for search in index page

router.get('/houses', function(req,res){
    House.getHouses(function(err, houses){
        if(err){
            throw err;
        } 
   
   
        let list = houses.filter(h=> h.deal === "השכרה");
        res.json(list);


   
      
    });
  });




module.exports = router;
