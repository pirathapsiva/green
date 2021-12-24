const mongoose = require ('mongoose');
const User = require('../models/user.models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.user_get_all = (req,res,next)=>{
    User.find()
    .select('name _id address phonenumber password role ')
    .exec()
    .then(result =>{
        res.status(200).json({
            Count : result.length,
            Users : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(401).json({
            error : err
        })
    })
}


exports.user_signup = (req,res,next)=>{
   
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
             return res.status(409).json({
                 message:"Already have an  account"
             })
        } else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    console.log("Hello")
                    console.log(err);
                    return res.status(500).json({
                        error:err
                        });
                } else{ const user = new User({
                        _id : mongoose.Types.ObjectId(),
                        name:req.body.name,
                        phonenumber:req.body.phonenumber,
                        email : req.body.email,
                        password : hash,
                        role : req.body.role
                         });
                        user.save()
                        .then(result =>{
                            console.log(result);
                            res.status(200).json({
                                message : "User Created",
                                user
                            })
                        })
                        .catch(err =>{
                            res.status(500).json({
                                error:err
                            })
                        })
                }
            })
        }
    })
    
     
}


exports.user_login = (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Auth failed'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(error,result)=>{
           
             if(result){
               const token = jwt.sign({
                   email : user[0].email,
                   userId : user[0]._id
               },
               process.env.JWT_KEY,
               {
                   expiresIn:"1h"
               }
               );
               return res.status(200).json({
                   user:user,
                   message:"Logged In",
                   token : token
               })
            }
            else{
                return res.status(401).json({
                    message:"Auth failed"
                });
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
})
}


exports.user_delete = (req,res,next)=>{
    User.deleteOne({_id:req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"user Deleted"
        })
    })
    .catch(err =>{
        res.status(404).json({
            error:err
        })
    })
}

// exports.restrict = (...roles)=>{
//     return (req,res,next)=>{
        
//         if(!roles.includes(req.user.body.role)){
//             return (err)=>{
//                 console.log(err);
//                 res.status(403).json({
//                     message : "You have no authorization to perform this activity"
//                 })
//             }
//         }
        
//     }
// }


