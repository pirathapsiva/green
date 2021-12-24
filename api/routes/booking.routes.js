const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/checkAdmin')
const BookingController = require( '../controllers/booking.controllers');

router.get('/' ,BookingController.booking_get_all );

router.post('/' , BookingController.create_booking);

router.get('/:bookingId' ,checkAuth,checkAdmin, BookingController.get_booking);

router.delete('/:bookingId' ,BookingController.delete_booking );

module.exports = router;