"use strict";

const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const buttonSubmit = document.querySelector("#btn-submit");

// GET USER LIST DATA FROM LOCAL STORAGE
const userList = UserStorage.data || [];

// LOGIN BUTTON ON CLICK
buttonSubmit.addEventListener("click", function () {
    const loginUser = login(inputUsername.value, inputPassword.value);
    if (loginUser) {
        CurrentUser.data = loginUser;
        window.location.href = "../index.html";
    }
});

// LOGIN FUNCTION
function login(username, password) {
    // check validate data
    if (username == "") {
        alert("Please enter username");
        return false;
    }
    if (password == "") {
        alert("Please enter password");
        return false;
    }

    // check login
    let userLogin = userList.filter((user) => user.username === username);
    if (userLogin.length === 1) {
        if (userLogin[0].password == password) {
            return userLogin[0];
        }
        alert("Wrong password");
        return false;
    }
    alert("Username does not exist");
    return false;
}
