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
    addresses: [{ number: String, line1: String, line2: String, postCode: String }]
});

module.exports = mongoose.model('hamburger', hamburgerSchema);
