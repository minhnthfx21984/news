"use strict";

class LocalStorage {
    constructor(name) {
        this.name = name;
    }

    set data(arrData) {
        localStorage.setItem(this.name, JSON.stringify(arrData));
    }

    get data() {
        return JSON.parse(window.localStorage.getItem(this.name)) || [];
    }

    remove() {
        localStorage.removeItem(this.name);
    }
}

const UserStorage = new LocalStorage("userStorage");
const CurrentUser = new LocalStorage("currentUser");
const TodoList = new LocalStorage("todoList");
const SettingPage = new LocalStorage("settingPage");
