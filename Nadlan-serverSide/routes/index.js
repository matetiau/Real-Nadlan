const express = require('express');
const router = express.Router();

/* GET home page. */
router.use(express.static('public'));
router.use(express.json());
router.use('/api', require('./api'));
House = require('../models/house');



var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });



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
      
      let list = [];
      let superList = [];
      
        for (let i = 0;i<6;i++){
            let num = (houses[Math.floor(Math.random()*houses.length)]);

            let koko = (houses[Math.floor(Math.random()*houses.length)]);
            
            if (!superList.includes(num)){
            superList.push(num);}
            if (!list.includes(koko) ){
                list.push(koko);}
                else {
                    list.push(num);
                }
            
        
        }
      
      res.render('index', {list:list,user:req.user,host:host,superList:superList});}
       else {
        res.render('index');
       }
  });
});

//for search in index page

router.get('/search',urlencodedParser, function(req,res){
    House.getHouses(function(err, houses){
        if(err){
            throw err;
        } 
        
        const types =  req.query.types;
        let rooms = req.query.rooms;
        const area =  req.query.area;
        const priceLow =  req.query.priceRangeLow;
        const priceHigh =  req.query.priceRangeHigh;
        const deal =  req.query.deal;
        
        if(types === "קרקע"){
            rooms = "0";
        }
        
        

        let list = houses.filter(house=> house.deal === deal 
                            && house.types === types
                            && house.area === area
                            && parseInt(house.price) >= parseInt(priceLow)
                            && parseInt(house.price) <= parseInt(priceHigh)
                            && parseInt(house.rooms) === parseInt(rooms) );
        
        
        if(list.length === 0){
            

            res.render('styleForNoHousesFound');
        } else {
            res.render('houses', {list:list});}


   
      
    });
  });




module.exports = router;
