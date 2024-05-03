console.log("[userService] initialized");

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

const {Pool, Client} = require('pg');

const pool = new Pool ({
    user: 's24',
    host: 'localhost',
    database: 's24',
    password: 's24',
    port: '5432',
});

exports.pool = pool;

exports.getAllUsers = async () => {
    let query = `
        SELECT u.id, u.firstname, u.lastname, u.email, u.username, COUNT(f.followed_id) as follow_count FROM s24.users u LEFT JOIN s24.follows f ON u.id = f.followed_id GROUP BY u.id;`;
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch (error) {
        console.error('Error fetching users with follow count:', error);
        throw error;
    }
}

/*
let query = "select * from s24.users;";
    let res = await pool.query(query);

    let users = [];
    if(res.rowCount > 0) {
        for (let i = 0; i < res.rows.length; i++) {
            let user = {};
            user.id = res.rows[i].id;
            user.firstname = res.rows[i].firstname;
            user.lastname = res.rows[i].lastname;
            user.email = res.rows[i].email;
            user.username = res.rows[i].username;
            user.password = res.rows[i].password;
            console.log(user);
            users.push(user);
        }
    }
    console.log(users);
    return users;
*/