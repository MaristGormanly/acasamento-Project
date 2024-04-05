class User {
    constructor (firstName, lastName, email, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

exports.createUser = function(firstName, lastName, email, username, password) {
  return new User(firstName, lastName, email, username, password);
};