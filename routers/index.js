const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
var secret = 'xxx';
router.get('/', (req, res) => {
    res.json({ message: 'Merhaba' });
});
//Register user 
router.post('/register', async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    await newUser.save((err, newUser) => {
        if (err) {
            res.json({ success: false, msg: `Failed to saved ${err}` })
        } else {
            res.json({ success: true, msg: `Successfully saved : ${newUser}` });
        }
    });
    /*    res.json({ message: 'Register Page' }) */
})
//Login user 
router.post('/login', async (req, res) => {
    await User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err
        if (!user) {
            res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
        }

        else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, process.env.SECRET)
                    res.json({ success: true, token: token })
                }
                else {
                    return res.status(403).json({ success: false, msg: 'Authentication failed, wrong password' })
                }
            })
        }
    }
    )

})
//kullanıcının özel alanı 
router.get('/getInfo', async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, process.env.SECRET);
        return res.json({ success: true, msg: 'Hello ' + decodedToken.email })
    } else {
        res.json({ success: false, msg: 'No headers' })
    }
})

module.exports = router;