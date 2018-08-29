const express = require('express');
const router = express.Router();
const routes = require('./api')
/* GET home page. */
router.use(express.static('public'));
router.use(express.static('routes/Html-files'));

router.use(express.json());
router.use(routes);


router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
 
});






module.exports = router;
