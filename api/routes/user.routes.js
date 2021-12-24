const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const userControllers = require('../controllers/user.controllers');
const checkAdmin = require('../middleware/checkAdmin')





router.get('/',   userControllers.user_get_all)
router.post('/signup', userControllers.user_signup )
router.post('/login', userControllers.user_login)
router.delete("/:userId",userControllers.user_delete)

module.exports = router;

// checkAuth , checkAdmin ,
// checkAdmin,checkAuth