var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('./index.html', null, function(error, data){
    if(error){
      res.writeHead(404);
      res.write('File not found');
    } else {
      res.write(data);
    }
    res.end();
 
});

module.exports = router;
