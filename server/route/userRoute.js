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
router.delete('/:index', userController.deleteUser);

module.exports = router;

console.log("[userRoute] initialized");