console.log("[userRoute] initialized");

var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);

// Route for creating a new user
router.post('/', userController.saveUser);

// Route for getting a specific user
router.get('/:index', userController.getUser);

// Route for updating a user using PUT
router.put('/:index', userController.updateUser);

// Route for partially updating a user using PATCH
router.patch('/:index', userController.partialUpdateUser);

// Route for deleting a user
router.delete('/:userId', userController.deleteUser);

// Route for searching for a user
router.post('/search', userController.searchUsers);

// Route for following a user
router.post('/:userId/follow', userController.followUser);

// Route for unfollowing a user
router.post('/:userId/unfollow', userController.unfollowUser);

module.exports = router;