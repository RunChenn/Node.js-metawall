var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users');

router.get('/', UsersControllers.getUsers);

module.exports = router;
