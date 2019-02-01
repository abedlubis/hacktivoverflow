var express = require('express');
var router = express.Router();
var {Authentication} = require('../middlewares/index')
var userController = require('../controllers/user')


/* GET users listing. */
router.get('/watch', Authentication, userController.getMyWatch)
router.post('/watch', Authentication, userController.addWatchTag)
router.delete('/watch/:id', Authentication, userController.deleteWatch)

module.exports = router;
