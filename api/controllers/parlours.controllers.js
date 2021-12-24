const Parlours = require('../models/parlours.models');
const mongoose = require('mongoose');

const e = require('cors');





exports.parlours_get_all = (req,res,next)=>{
const queryObj = {...req.query};
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);

Parlours.find(JSON.parse(queryStr)) 
.select('name address _id email contactNo regNo ')
.exec()
.then(docs =>{
    const response = {
        count:docs.length,
        parlours: docs
    }
    
   // if(docs.length >= 0 ){
        res.status(200).json(response);
   // }
    //else{
        //res.status(404).json({
           // message:"No entires Found"
       // })
   // }
  //   res.status(200).json(docs)
})
.catch(err =>{
    console.log(err);
    res.status(500).json({
        error:err
    })
})
}

exports.parlours_post = (req,res,next)=>{
    const parlours = new Parlours(
        { _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        address:req.body.address,
        contactNo:req.body.contactNo,
        email :req.body.email,
        regNo:req.body.regNo

        } );
    parlours.save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
             createdProduct : result,
            message : " Parlours has been Added"
             })
        })
        .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}

exports.parlours_get_byid = (req,res,next)=>{
    const id = req.params.parloursId;
    if(id.length === 24){
    Parlours.findById(req.params.parloursId)
    .exec()
    .then(result =>{
        if(!result){
            return res.status(404).json({
                message:"parlours not found"
            })
        }
        res.status(200).json({
            output : result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({
            message:err
        })
    })
} else {
    return res.status(200).json({
        message : "Invalid Id"
    })
}
}


exports.parlours_patch = (req,res,next)=>{ 
    console.log(req.file);
    console.log(req.body);


    const id = req.params.parloursId
    if(id.length === 24){//req.body is not iterable
    Parlours.findById(id)
    .exec()
    .then(result =>{
        if(!result){
            res.status(400).json({
                message:"Parlours not found"
            })
        } else {
            const update = req.body
            Parlours.findByIdAndUpdate(id,update)
            .exec()
            .then(updatedVersion =>{
                console.log(updatedVersion);
                res.status(200).json({
                    message : "parlours has been Updated",
                    result : updatedVersion
                })
            })
        }
    })

} else {
    res.status(400).json({
        message : "Invalid id"
    })
}
}


exports.parlours_delete = (req,res,next)=>{
    Parlours.findByIdAndDelete(req.params.foodId) //
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"Parlours has been Deleted",
           })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}
