const router = require('express').Router();
const User = require('../models/user');
const IndexController = require('../controllers/index_controller');
const jwt = require('jwt-simple');

router.get('/', IndexController.main);
//Register user 
router.post('/register', IndexController.register);
//Login user 
router.post('/login', IndexController.login)
//kullanıcının özel alanı 
router.get('/getInfo', IndexController.getInfo);
//Hamburger gösterimi 
router.get('/showHamburger',IndexController.getHamburger);
router.post('/addHamburger',IndexController.postHamburger);
module.exports = router;