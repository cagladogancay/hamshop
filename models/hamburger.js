const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hamburgerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    restaurant: {
        type: String
    },
    web: {
        type: String,
    },
    description: String,
    imageUrl: String,
    ingredients: [

    ],
    addresses: []
});

module.exports = mongoose.model('hamburger', hamburgerSchema);
