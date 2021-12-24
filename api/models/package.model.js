const mongoose = require('mongoose');
 

const packageSchema = mongoose.Schema({
    package:{type:mongoose.Schema.Types.ObjectId, ref: 'Parlours', required: true},
    date:{type:Date,default:Date.now},
    address:{type:String}

    
    //_id: mongoose.Schema.Types.Objec
    //_id: mongoose.Schema.Types.ObjectId,
   // food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    //quantity: { type: Number, default:1}
   
})

module.exports = mongoose.model('Package',packageSchema);




