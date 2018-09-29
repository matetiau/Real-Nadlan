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
      
      
      let list = houses.filter(h=> h.premiumHouse === "premium");
      res.render('index', {list:list,user:req.user});
  });
});


module.exports = router;
