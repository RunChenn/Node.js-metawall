var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users');
const { isAuth } = require('../middleware/auth');

router.get('/', UsersControllers.getUsers);
router.get('/profile', isAuth, UsersControllers.getProfile);
router.patch('/profile', isAuth, UsersControllers.updateProfile);
// router.get('/', UsersControllers.getUsers);

router.post('/sign_up', UsersControllers.sign_up);
router.post('/sign_in', UsersControllers.sign_in);
router.post('/updatePassword', isAuth, UsersControllers.updatePassword);


router.get('/getLikeList', isAuth, UsersControllers.getLikeList);

module.exports = router;
