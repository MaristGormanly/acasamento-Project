const User = require('../model/user');
const userService = require('../service/userService');

let users = [];

let brian = User.createUser("Kyrie", "Irving", "kirving@email.com", "@kyrieirving", "KIpass");
users.push(brian);

let aj = User.createUser("AJ", "Casamento", "andrew.casamento1@marist.edu", "@aj.casamento", "password");
users.push(aj);

let elon = User.createUser("Elon", "Musk", "muskman@email.com", "@Elon", "twittersucks123");
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

exports.searchUsers = (req, res) => {
    const criteria = req.body;
    const matchingUsers = userService.searchUsers(criteria, users);
    res.json(matchingUsers);
}

console.log("[userController] initialized");