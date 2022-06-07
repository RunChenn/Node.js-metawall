var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users');

router.get('/', UsersControllers.getUsers);
// router.get('/profile/:id', UsersControllers.getUsers);
// router.get('/', UsersControllers.getUsers);

router.post('/sign_up', UsersControllers.sign_up);
router.post('/sign_in', UsersControllers.sign_in);

module.exports = router;
