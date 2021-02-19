const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        min: 3,
        max: 10,
        require: true
    }
})
// kayıt yani save metodu çağrıldığında çalışacak pre middleware
userSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next();
            })
        })

    } else {
        return next();
    }
});
//loginde şifre karşılaştırmak için 
userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    })
}
module.exports = mongoose.model('User', userSchema);