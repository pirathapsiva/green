const Booking = require('../models/booking.model');

const mongoose = require('mongoose');

exports.booking_get_all =  (req, res, next) => {
    Booking.find()
    
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

exports.create_booking = (req, res, next) => {
    const booking = new Booking({
        booking:req.body.parlours
    })
    booking.save()
                .then(result => {
                console.log(result);
                res.status(201).json({
                   message:'Order stored'
             })
        })
        .catch(err=>{
             res.status(500).json({
                message: err
            });    
        })
  
}

exports.get_booking = (req, res, next) => {
    Booking.findById(req.params.orderId)
    .populate('bookingParlours.parlours')
    .exec()
    .then(booking => {
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }
        res.status(200).json({
            booking: booking
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
}

exports.delete_booking = (req, res, next) => {
    Booking.deleteOne({_id: req.params.parloursId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "Booking deleted",
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