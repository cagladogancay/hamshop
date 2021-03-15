const router = require('express').Router();
const IndexController = require('../controllers/index_controller');

router.get('/', IndexController.main);
//Register user 
router.post('/register', IndexController.register);
//Login user 
router.post('/login', IndexController.login)
//kullanıcının özel alanı 
router.get('/getInfo', IndexController.getInfo);
//Hamburger gösterimi 
router.get('/showHamburger',IndexController.getHamburger);
//Tek hamburger id ile gösterimi
router.get('/showHamburger/:id',IndexController.getSingleHamburger);
router.post('/addHamburger',IndexController.postHamburger);
module.exports = router;