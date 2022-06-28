var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth } = require('../middleware/auth');

router.get('/', isAuth, PostsControllers.getPosts);

router.post('/', isAuth, PostsControllers.createdPosts);

router.post('/:id/likes', isAuth, PostsControllers.addLikes);
router.delete('/:id/unlikes', isAuth, PostsControllers.deleteLikes);

router.post('/:id/comment', isAuth, PostsControllers.addComment);

router.get('/user/:id', isAuth, PostsControllers.getUserPost);

module.exports = router;
