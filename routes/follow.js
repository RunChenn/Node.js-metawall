var express = require('express');
var router = express.Router();
const FollowControllers = require('../controllers/follow');
const { isAuth } = require('../middleware/auth');

router.get('/:id', isAuth, FollowControllers.getFollow);

router.post('/:id', isAuth, FollowControllers.updateFollow);

router.delete('/:id', isAuth, FollowControllers.deleteFollow);

module.exports = router;
