const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/checkAdmin')
const PackageController = require( '../controllers/package.controllers');

router.get('/' ,PackageController.package_get_all );

router.post('/' , PackageController.create_package);

router.get('/:packageId' ,checkAuth,checkAdmin, PackageController.get_package);

router.delete('/:packageId' ,PackageController.delete_package );

module.exports = router;