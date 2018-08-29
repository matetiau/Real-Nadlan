const express = require('express');
const router = express.Router();

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


//get all houses
router.get('/houses',(req, res) => {
    res.send(houses);
   
  });
  
// add new house 
router.post('/houses/addNew',(req, res) => {
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


// change specs of house
router.put('/houses/:id',(req, res) => {
  res.send({type:'PUT'});
 
});

//delete house
router.delete('/houses/:id',(req, res) => {
  res.send({type:'DELETE'});
 
});

  /*router.get('/houses/:area',(req, res) => {
    const resulta = houses.filter(house => house.area === (req.params.area));
    if (resulta === undefined){
      res.send(404);
    } else {
  
    
    res.send(resulta);}
    res.end();
    
  });*/

  module.exports = router;