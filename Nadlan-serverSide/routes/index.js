const express = require('express');
const router = express.Router();

/* GET home page. */
router.use(express.static('public'));
router.use(express.static('routes/Html-files'));

router.use(express.json());
router.use('/api', require('./api'));


router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  
console.log(process.env.port);
});





module.exports = router;
