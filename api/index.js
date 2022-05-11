var express = require('express');
var router = express.Router();
const fileController = require('../Controller/fileController');
const authController = require('../Controller/authController');
const auth = require('../Config/jwtHelper').verifyJwtToken;

router.get('/file/:filename', auth, fileController.fileDownload);

router.post('/fileupload', auth, fileController.fileUpload);

router.post('/signup', authController.signUp);

router.post('/login', authController.login);
 
module.exports = router;