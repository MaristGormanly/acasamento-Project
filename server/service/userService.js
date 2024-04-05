const User = require('../model/user');

exports.searchUsers = (criteria, users) => {
    const filteredUsers = users.filter(user => {
        for (const key in criteria) {
            if (user[key] !== criteria[key]) {
                return false;
            }
        }
        return true;
    });
    return filteredUsers;
};