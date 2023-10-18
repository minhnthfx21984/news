"use strict";

const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputPasswordConfirm = document.querySelector("#input-password-confirm");
const buttonSubmit = document.querySelector("#btn-submit");

const userList = UserStorage.data || [];

// BUTTON REGISTER ON CLICK
buttonSubmit.addEventListener("click", function () {
    const newUserData = {
        firstname: inputFirstName.value,
        lastname: inputLastName.value,
        username: inputUsername.value,
        password: inputPassword.value,
        passwordConfirm: inputPasswordConfirm.value,
    };
    if (checkValidate(newUserData)) {
        // remove confirm password
        const addUser = {
            firstname: newUserData.firstname,
            lastname: newUserData.lastname,
            username: newUserData.username,
            password: newUserData.password,
        };
        // push data to array
        userList.push(addUser);

        // update local storage
        UserStorage.data = userList;
        window.location.href = "../pages/login.html";
    }
});

// CHECK VALIDATE DATA
function checkValidate(newUserData) {
    // all fields is not blank
    if (
        newUserData.firstname === "" ||
        newUserData.lastname === "" ||
        newUserData.username === "" ||
        newUserData.password === "" ||
        newUserData.passwordConfirm === ""
    ) {
        alert("Please fill out the information completely");
        return false;
    }

    // username must be unique
    if (userList.find((user) => user.username == newUserData.username)) {
        alert("Username is already taken");
        return false;
    }

    // password must be more than 8 characters
    if (newUserData.password.length < 8) {
        alert("Password must be more than 8 characters");
        return false;
    }

    // password and password confirm must be equal
    if (newUserData.password !== newUserData.passwordConfirm) {
        alert("Password and re-enter password are not the same");
        return false;
    }
    return true;
}
