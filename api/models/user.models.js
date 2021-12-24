const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:[true, 'Name is required']},
    email:{
        type : String,
        required:[true,'Please provide you email'],
        lowercase : true,
        validate : [validator.isEmail,'Please provide a valid Email']
    },
    phonenumber:{type:Number,required:[true,'Please provide phonenumber']},
    role : {
       type : String,
       enum :['user','admin'] ,
       default :'user'
    },
    password:{type :String,
        required : [true],
        minlength : 6
    },
    
   
    

})

module.exports = mongoose.model('User',userSchema);