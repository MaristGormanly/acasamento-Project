var express = require('express');
var router = express.Router();
const postController = require('../controller/postController');

// Route for getting all posts
router.get('/', postController.getAllPosts);

// Route for creating a new post
router.post('/', postController.createPost);

// Route for getting a specific post
router.get('/:index', postController.getPost);

// Route for updating a post using PUT
router.put('/:index', postController.updatePost);

// Route for partially updating a post using PATCH
router.patch('/:index', postController.partialUpdatePost);

// Route for deleting a post
router.delete('/:index', postController.deletePost);

// Route for liking a post
router.post('/:index/like', postController.likePost);

// Route for unliking a post
router.post('/:index/unlike', postController.unlikePost);

module.exports = router;