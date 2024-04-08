class User {
    constructor (userId, firstName, lastName, email, username, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.following = [];
    }
}

exports.createUser = function(userId, firstName, lastName, email, username, password) {
  return new User(userId, firstName, lastName, email, username, password);
};