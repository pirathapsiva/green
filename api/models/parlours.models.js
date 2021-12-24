const mongoose = require('mongoose');
const validator = require('validator')

const parlourSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Parlours is required']
    },
    contactNo: { type: Number, required: [true, 'Please provide phonenumber'] },
    address: {
        type: String,
        required: [true, 'Please provide an Address']
    },
    email: {
        type: String,
        required: [true, 'Please provide you email'],
        lowercase: true,
    },
    regNo: String,

})

module.exports = mongoose.model('Parlours', parlourSchema);