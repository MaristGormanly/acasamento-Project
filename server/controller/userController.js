const User = require('../model/user');
const userService = require('../service/userService');

let users = [];

let brian = User.createUser("001", "Kyrie", "Irving", "kirving@email.com", "@kyrieirving", "KIpass");
users.push(brian);

let aj = User.createUser("002", "AJ", "Casamento", "andrew.casamento1@marist.edu", "@aj.casamento", "password");
users.push(aj);

let elon = User.createUser("003", "Elon", "Musk", "muskman@email.com", "@Elon", "twittersucks123");
users.push(elon);

// GET Request
exports.getAllUsers = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(users);
}

// GET Request
exports.getUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(users[req.params.index]);
}

// POST Request
exports.saveUser = (req, res) => {
    let newUser = User.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.username, req.body.password);
    users.push(newUser);
    res.setHeader('Content-Type', 'application/json');
    res.send(users);
}

// PUT Request
exports.updateUser = (req, res) => {
    const index = req.params.index;
    const { firstName, lastName, email, username, password } = req.body;

    if (index >= 0 && index < users.length) {
        let updatedUser = User.createUser(firstName, lastName, email, username, password);
        users[index] = updatedUser;
        res.setHeader('Content-Type', 'application/json');
        res.send(users[index]);
    } else {
        res.status(404).send("User not found");
    }
}

// PATCH Request
exports.partialUpdateUser = (req, res) => {
    const index = req.params.index;
    const { firstName, lastName, email, username, password } = req.body;

    if (index >= 0 && index < users.length) {
        const currentUser = users[index];
        if (firstName) currentUser.firstName = firstName;
        if (lastName) currentUser.lastName = lastName;
        if (email) currentUser.email = email;
        if (username) currentUser.username = username;
        if (password) currentUser.password = password;
        res.send(users);
    } else {
        res.status(404).send("User not found");
    }
}

// DELETE Request
exports.deleteUser = (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < users.length) {
        users.splice(index, 1);
        res.send(users);
    } else {
        res.status(404).send("User not found");
    }
}

// POST Request (search)
exports.searchUsers = (req, res) => {
    const criteria = req.body;
    const matchingUsers = userService.searchUsers(criteria, users);
    res.json(matchingUsers);
}

// POST Request (follow)
exports.followUser = (req, res) => {
    const userId = req.params.userId;
    const currentUser = users.find(user => user.userId === userId);
    const userToFollowId = req.body.userToFollowId;
    const userToFollow = users.find(user => user.userId === userToFollowId);

    if (!currentUser || !userToFollow) {
        return res.status(404).send("User not found");
    }

    if (currentUser.following.includes(userToFollowId)) {
        return res.status(400).send("You are already following this user");
    }

    currentUser.following.push(userToFollowId);
    res.status(200).send("User followed successfully");
}

// POST Request (unfollow)
exports.unfollowUser = (req, res) => {
    const userId = req.params.userId;
    const currentUser = users.find(user => user.id === userId);
    const userToUnfollowId = req.body.userToUnfollowId;

    if (!currentUser) {
        return res.status(404).send("User not found");
    }

    const index = currentUser.following.indexOf(userToUnfollowId);
    if (index === -1) {
        return res.status(400).send("You are not following this user");
    }

    currentUser.following.splice(index, 1);
    res.status(200).send("User unfollowed successfully");
}

console.log("[userController] initialized");