var express = require('express');
var router = express.Router();
const UploadControllers = require('../controllers/upload');
const { isAuth } = require('../middleware/auth');
const upload = require('../middleware/image');

router.post('/', isAuth, upload, UploadControllers.upload);

module.exports = router;
