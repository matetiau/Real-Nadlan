const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');




//how files are stored
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file,cb){
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) =>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
  {
  cb(null, true);
  } else {
  cb(null, false);
  }
};

const upload = multer({
  storage:storage, 
  limits:{
  fileSize: 1024 *1024 *2
},
fileFilter : fileFilter
});
//path to house file
House = require('../models/house');


router.use(express.static('public'));
router.use(express.json());




var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// parse application/json
router.use(bodyParser.json())



//get all houses

   
router.get('/houses', function(req,res){
  House.getHouses(function(err, houses){
      if(err){
          throw err;
      } 
      let list = houses;
      res.json(list);
      /res.render('houses', {list:list});/
  });
});

//get all houses for sale

router.get('/houses/spec/:_types/:_deal', function(req,res){
  House.getHousesSpec(req.params._deal, req.params._types, function(err, houses){
      if(err){
          throw err;
      } 
      let list = houses.filter(h=> h.deal === req.params._deal);
      let list2 = list.filter(h=> h.types === req.params._types);
      res.json(list2);
      
  });
});


//get all houses for rent
router.get('/houses/spec/:_rent', function(req,res){
  House.getHouses(function(err, houses){
      if(err){
          throw err;
      } 
      let list = houses.filter(h=> h.deal === "השכרה");
      res.json(list);
      
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
      const houseImage = house.houseImage;

      res.render('list', 
              {
              title:title ,
              type:types ,
              rooms:rooms ,
              area:area ,
              price : price + "שקל",
              houseImage: houseImage
        
          
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


// add new house view
router.get('/houses/spec/add', function(req,res){
  
      
  res.render('form-addhouse');

});


//add new house post req
router.post('/houses/spec/add', upload.single('houseImage'),urlencodedParser, function(req,res){
  let house = new House();
  house.title = req.body.title;
  house.types = req.body.types;
  house.area = req.body.area;
  house.deal = req.body.deal;
  house.rooms = req.body.rooms;
  house.price = req.body.price;
  
  //making link to the image for house
  let str = req.file.path;
  let finalForm = str.replace("uploads\\", "http://localhost:3000/");
  house.houseImage = finalForm;
  
  House.addHouse(house, function(err, house){
      if(err){
          throw err;
      }
      console.log(req.body.price);
      res.redirect('/api/houses/'+house.id);
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

//change house to premium house

router.put('/houses/:_id', function(req,res){
    var id = req.params._id;
    var house = req.body;
    House.updateHousePremium(id,house,{}, function(err, house){
        if(err){
            throw err;
        } 
        res.json(house);
    });
  });





module.exports = router;
