"use strict";

const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const welcomeMessage = document.querySelector("#welcome-message");
const buttonLogout = document.querySelector("#btn-logout");

const currentUser = CurrentUser.data;

checkCurrentUser();

buttonLogout.addEventListener("click", function () {
    logoutCurrentUser();
});

// CHECK CURRENT USER FUNCTION
function checkCurrentUser() {
    if (currentUser && currentUser.length != 0) {
        loginModal.classList.add("hidden");
        mainContent.classList.remove("hidden");
        welcomeMessage.textContent = `Welcome ${currentUser.firstname} ${currentUser.lastname}`;
        return true;
    }
    if (currentUser.length === 0) {
        loginModal.classList.remove("hidden");
        mainContent.classList.add("hidden");
        return false;
    }
}

// LOGOUT FUNCTION
function logoutCurrentUser() {
    if (checkCurrentUser()) {
        CurrentUser.remove();
        window.location.href = "./pages/login.html";
    }
}
