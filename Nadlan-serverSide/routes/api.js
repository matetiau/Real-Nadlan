const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');


let reqPath = path.join(__dirname, '../public/html-files');




router.use(express.static('public'));
router.use(express.json());



var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// parse application/json
router.use(bodyParser.json())

const houses = [
    {id: 1 ,typeTr:"השכרה", type: 'דירה', area: 'מרכז',rooms: 2,price: 1503000},
    {id: 2 ,typeTr:"השכרה", type: 'דירה', area: 'מרכז',rooms: 4,price: 100000},
    {id: 3 ,typeTr:"מכירה", type: 'דירה', area: 'דרום',rooms: 1,price: 1500000},
    {id: 4 ,typeTr:"השכרה", type: 'קרקע', area: 'צפון',price: 1500000},
    {id: 5 ,typeTr:"מכירה", type: 'דירה', area: 'מרכז',rooms: 2,price: 1500000},
    {id: 6 ,typeTr:"השכרה", type: 'בית-פרטי', area: 'דרום',rooms: 4,price: 1500000},
    {id: 7 ,typeTr:"השכרה", type: 'דירה', area: 'צפון',rooms: 3,price: 300000},
    {id: 8 ,typeTr:"השכרה", type: 'דירה', area: 'מרכז',rooms: 2,price: 1200000},
    {id: 9 ,typeTr:"השכרה", type: 'דירה', area: 'דרום',rooms: 4,price: 2000000},
    {id: 10 ,typeTr:"השכרה", type: 'בית-פרטי', area: 'צפון',rooms: 3,price: 1500000},
  ];   

const accounts = [
   
];



// all houses for rent or sale
  router.get('/houses/:typeTr',(req, res) => {
    
      resulta = houses.filter(house => house.typeTr === req.params.typeTr)
    res.render('houses', {list:resulta})});
      
  
  

// specfic house

router.get('/houses-one/:id',(req, res) => {
  const resulta = houses.find(house => house.id === parseInt(req.params.id));
  
  const type = resulta.type;
  const rooms = resulta.rooms;
  const area = resulta.area;
  const price = resulta.price;


res.render('list', 
            {type:type ,
              rooms:rooms ,
              area:area ,
              price : price + "שקל"

          
          
          });

    
        });



//get all houses
router.get('/houses',(req, res) => {
  var port = process.env.PORT || 3000;
  console.log('Example app listening on port ' + port + '!');
    
      res.render('houses', {list:houses,port:port});
      console.log(houses);
    });
   



// add new house 
router.post('/houses/addNew',(req, res) => {
    res.send(houses); 
    const house = {
      id: houses.length +1,
      type: req.body.type,
      typeTr: req.body.typeTr,
      area: req.body.area,
      rooms: req.body.rooms

    }
    
    houses.push(house);
    res.send(house);
   
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
  if (accounts.find(acc => acc.email === req.body.email)){
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






//delete house
router.delete('/houses/:id',(req, res) => {
  const resulta = houses.find(house => house.id === parseInt(req.params.id));
  houses.splice(0,1,resulta);
  console.log(resulta);
});



//registration

router.delete('/houses/:id',(req, res) => {
  res.send({type:'DELETE'});
 
});

  module.exports = router;