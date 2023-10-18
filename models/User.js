"use strict";

class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}
function parseUser(userData) {
    const user = new User(
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password
    );
    return user;
}
