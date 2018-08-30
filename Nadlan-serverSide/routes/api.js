const express = require('express');
const router = express.Router();
const path = require('path');
let reqPath = path.join(__dirname, '../public/html-files');
router.use(express.static('public'));

router.use(express.json());


const houses = [
    {id: 1 ,typeTr:"השכרה", type: 'דירה', area: 'מרכז',rooms: 2},
    {id: 2 ,typeTr:"השכרה", type: 'דירה', area: 'מרכז',rooms: 4},
    {id: 3 ,typeTr:"מכירה", type: 'דירה', area: 'דרום',rooms: 1},
    {id: 4 ,typeTr:"השכרה", type: 'קרקע', area: 'צפון',size: 500+"מטר"},
    {id: 5 ,typeTr:"מכירה", type: 'דירה', area: 'מרכז',rooms: 2},
    {id: 6 ,typeTr:"השכרה", type: 'בית-פרטי', area: 'דרום',rooms: 4},
    {id: 7 ,typeTr:"השכרה", type: 'דירה', area: 'צפון',rooms: 3},
    {id: 8 ,typeTr:"השכרה", type: 'דירה', area: 'מרכז',rooms: 2},
    {id: 9 ,typeTr:"השכרה", type: 'דירה', area: 'דרום',rooms: 4},
    {id: 10 ,typeTr:"השכרה", type: 'בית-פרטי', area: 'צפון',rooms: 3},
  ];   



  // one house specs
  router.get('/houses/:id',(req, res) => {
    res.sendFile(reqPath + '/for-home.html');
    const resulta = houses.filter(house => house.id=== (req.params.id));
  if (resulta === undefined){
    res.send(404);
  } else {

  res.write()
  res.send(resulta);}
  res.end();
   
  });

//get all houses
router.get('/houses',(req, res) => {
    res.send(houses);
   
  });
  

//get all houses for rent
router.get('/houses/:typeTr',(req, res) => {
  const resulta = houses.filter(house => house.typeTr=== (req.params.typeTr));
  if (resulta === undefined){
    res.send(404);
  } else {

  
  res.send(resulta);}
  res.end();
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




//delete house
router.delete('/houses/:id',(req, res) => {
  res.send({type:'DELETE'});
 
});


  module.exports = router;