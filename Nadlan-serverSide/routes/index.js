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
      
      const host = req.headers.host; 
      let list = houses.filter(h=> h.premiumHouse === "premium");
      let superList = houses.filter(h=> h.superPremiumHouse === "superPremium");
      res.render('index', {list:list,user:req.user,host:host,superList:superList});
  });
});


module.exports = router;
