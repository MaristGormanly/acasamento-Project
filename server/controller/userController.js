console.log("[userController] initialized");

const User = require('../model/user');
const userService = require('../service/userService');
const { pool } = require('../service/userService');

let users = [];

// GET Request
exports.getAllUsers = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let users = await userService.getAllUsers();
    res.send(users);
}

// GET Request
exports.getUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(users[req.params.index]);
}

// POST Request
exports.saveUser = (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    const queryText = 'INSERT INTO s24.users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    pool.query(queryText, [firstname, lastname, email, username, password])
        .then(result => {
            console.log("New user created:", result.rows[0]);
            res.status(201).json(result.rows[0]);
        })
        .catch(e => {
            console.error('Error inserting new user:', e);
            res.status(500).send('Failed to create user');
        });
};

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
exports.deleteUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const queryText = 'DELETE FROM s24.users WHERE id = $1 RETURNING *;';
    const result = await pool.query(queryText, [userId]);

    if (result.rowCount > 0) {
        res.status(200).send({ message: "User deleted successfully" });
    } else {
        res.status(404).send({ message: "User not found" });
    }
};

// POST Request (search)
exports.searchUsers = (req, res) => {
    const criteria = req.body;
    const matchingUsers = userService.searchUsers(criteria, users);
    res.json(matchingUsers);
}

// POST Request (follow)
exports.followUser = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const userToFollowId = parseInt(req.body.userToFollowId);

    if (isNaN(userId) || isNaN(userToFollowId)) {
        return res.status(400).send({ message: "Invalid IDs provided." });
    }

    try {
        const result = await pool.query(
            "INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2) RETURNING *;",
            [userId, userToFollowId]
        );
        if (result.rowCount > 0) {
            res.status(200).send({ message: "User followed successfully", followDetails: result.rows[0] });
        } else {
            res.status(400).send({ message: "Unable to follow user" });
        }
    } catch (error) {
        console.error("Database error during follow operation:", error);
        res.status(500).send({ message: "Error following user", error: error.message });
    }
}

// POST Request (unfollow)
exports.unfollowUser = async (req, res) => {
    const userId = req.params.userId;
    const userToUnfollowId = req.body.userToUnfollowId;

    try {
        const result = await pool.query(
            "DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2",
            [userId, userToUnfollowId]
        );
        if (result.rowCount > 0) {
            res.status(200).send({ message: "User unfollowed successfully" });
        } else {
            res.status(404).send({ message: "Follow relationship not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error unfollowing user" });
    }
}