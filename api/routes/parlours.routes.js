const express = require('express');
const checkAuth = require('../middleware/check-auth')
const router = express.Router();

const checkAdmin = require('../middleware/checkAdmin');
const imgUpload = require('../middleware/imageUploadFood')
const parlourscont = require('../controllers/parlours.controllers')


router.get('/',parlourscont.parlours_get_all);

router.post('/',imgUpload, parlourscont.parlours_post);
router.patch('/:parloursId',parlourscont.parlours_patch);
router.delete('/:parloursId',parlourscont.parlours_delete);

module.exports = router; 