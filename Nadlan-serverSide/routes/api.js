const express = require('express');
const router = express.Router();
const path = require('path');
let reqPath = path.join(__dirname, '../public/html-files');
router.use(express.static('public'));
var bodyParser = require('body-parser')
router.use(express.json());



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




//delete house
router.delete('/houses/:id',(req, res) => {
  res.send({type:'DELETE'});
 
});


  module.exports = router;