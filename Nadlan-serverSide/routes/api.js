const express = require('express');
const router = express.Router();

const houses = [
    {id: 1 , type: 'דירה', area: 'מרכז'},
    {id: 2 , type: 'דירה', area: 'מרכז'},
    {id: 3 , type: 'דירה', area: 'דרום'},
    {id: 4 , type: 'דירה', area: 'צפון'},
    {id: 5 , type: 'דירה', area: 'מרכז'},
    {id: 6 , type: 'דירה', area: 'דרום'},
    {id: 7 , type: 'דירה', area: 'צפון'},
  ];   


//get all houses
router.get('/houses',(req, res) => {
    res.send(houses);
   
  });
  
// add new house 
  router.get('/houses/addNew',(req, res) => {
    res.send({type:'POST'});
   
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