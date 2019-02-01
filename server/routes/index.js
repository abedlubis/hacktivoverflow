var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res){
    res.json({
        message: 'it works'
    })
})
router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;
