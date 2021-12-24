const Package = require('../models/package.model');

const mongoose = require('mongoose');

exports.package_get_all =  (req, res, next) => {
    Package.find()
    
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
}

exports.create_package = (req, res, next) => {
    const package = new Package({
        package:req.body.parlours
    })
    package.save()
                .then(result => {
                console.log(result);
                res.status(201).json({
                   message:'Package stored'
             })
        })
        .catch(err=>{
             res.status(500).json({
                message: err
            });    
        })
  
}

exports.get_package = (req, res, next) => {
    Package.findById(req.params.parloursId)
    .populate('packageParlours.parlours')
    .exec()
    .then(package => {
        if (!booking) {
            return res.status(404).json({
                message: "Package not found"
            });
        }
        res.status(200).json({
            package: package
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
}

exports.delete_package = (req, res, next) => {
    Package.deleteOne({_id: req.params.parloursId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "Package deleted",
            request:{
                type: 'POST',
                url: 'http://localhost:3000/order',
                body: { parloursId: 'ID', quantity: "Number"}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    
    });
    
}