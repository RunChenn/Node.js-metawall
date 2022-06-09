var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth } = require('../middleware/auth');

router.get('/', isAuth, PostsControllers.getPosts);

router.post('/', isAuth, PostsControllers.createdPosts);

module.exports = router;
