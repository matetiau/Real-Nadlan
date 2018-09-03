const express = require('express');
const router = express.Router();

/* GET home page. */
router.use(express.static('public'));
router.use(express.json());
router.use('/api', require('./api'));


router.get('/', (req, res) => {
  res.render('index');
  
});





module.exports = router;
