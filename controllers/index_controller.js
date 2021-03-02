const User = require('../models/user');
const Hamburger = require('../models/hamburger');
const main = (req, res) => {
    res.json({ message: 'Merhaba' });
}
const register = async (req, res) => {
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
}
const login = async (req, res) => {
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

}

const getInfo = async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, process.env.SECRET);
        return res.json({ success: true, msg: 'Hello ' + decodedToken.email })
    } else {
        res.json({ success: false, msg: 'No headers' })
    }
}

const getHamburger = async (req, res) => {
    try {
        const allHamburger = await Hamburger.find();
        res.json({ allHamburger });
    } catch (error) {
        res.json({ success: false, msg: `Hamburgers could not be shown.${error} ` })
    }
}

const postHamburger = async (req, res) => {
    const newHamburger = new Hamburger({
        name: req.body.name,
        restaurant: req.body.restaurant,
        web: req.body.web,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        ingredients: [{ ingredientsName: req.body.ingredientsName }],
        addresses: [{
            number: req.body.number,
            line1: req.body.line1,
            line2: req.body.line2,
            postCode: req.body.postCode,
        }],
    });
    try {
        await newHamburger.save((err, newHamburger) => {
            if (err) {
                res.json({ success: false, msg: `New hamburger could not be added. ${err}` })
            }
            else {
                res.json({ success: true, msg: `Successfully saved : ${newHamburger}` });
            }
        })
    } catch (error) {
        res.json({ success: false, msg: `Hamburger could not be added ${error}` });
    }
}

module.exports = { main, register, login, getInfo, getHamburger, postHamburger }