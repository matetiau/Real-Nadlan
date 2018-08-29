const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
/* GET home page. */
router.use(express.static('public'));
router.use(express.static('routes/Html-files'));

router.use(express.json());

const houses = [
                {id: 1 , type: 'דירה', area: 'Merkaz'},
                {id: 2 , type: 'דירה', area: 'Merkaz'},
                {id: 3 , type: 'דירה', area: 'Darom'},
                {id: 4 , type: 'דירה', area: 'Zafon'},
                {id: 5 , type: 'דירה', area: 'Merkaz'},
                {id: 6 , type: 'דירה', area: 'Darom'},
                {id: 7 , type: 'דירה', area: 'Zafon'},
              ]   

router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
 
});

router.get('/houses', function(req, res, next) {
  res.send(houses);
 
});




module.exports = router;
