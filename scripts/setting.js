"use strict";

const inputPageSize = document.querySelector("#input-page-size");
const inputCategory = document.querySelector("#input-category");
const buttonSubmit = document.querySelector("#btn-submit");

const settingPage = SettingPage.data || [];

// SET DEFAULT VALUE IF EXIST
if (checkExistSetting(CurrentUser.data.username)) {
    let setting = getSetting(CurrentUser.data.username);
    inputPageSize.value = setting.pageSize;
    inputCategory.value =
        setting.category.charAt(0).toUpperCase() + setting.category.slice(1);
} else {
    inputPageSize.value = 10;
}

// BUTTON SAVE SETTING ON CLICK
buttonSubmit.addEventListener("click", function () {
    if (CurrentUser.data.length == 0) {
        alert("You must login first");
        return;
    }

    // set setting value
    let setting = {
        username: CurrentUser.data.username,
        pageSize: inputPageSize.value.toLowerCase(),
        category: inputCategory.value.toLowerCase(),
    };

    // check valid page size
    if (setting.pageSize < 1) {
        alert("Page size is not valid");
        return;
    }

    let getUserSetting = settingPage.filter(
        (e) => e.username == setting.username
    );

    // if username is not exist
    if (getUserSetting.length == 0) {
        settingPage.push(setting);
        SettingPage.data = settingPage;
    }

    // if username is exist
    if (getUserSetting.length == 1) {
        settingPage.forEach((e) => {
            if (e.username == getUserSetting[0].username) {
                e.pageSize = setting.pageSize;
                e.category = setting.category;
            }
        });

        // saving data to local storage
        SettingPage.data = settingPage;
        alert("Save setting successful");
    }
});

// CHECK EXIST USER SETTING
function checkExistSetting(username) {
    let getUserSetting = SettingPage.data.filter((e) => e.username == username);
    if (getUserSetting.length == 0) {
        return false;
    }
    return true;
}

// GET PAGE SIZE, CATEGORY RETURN OBJECT
function getSetting(username) {
    if (checkExistSetting(username)) {
        let getUserSetting = SettingPage.data.filter(
            (e) => e.username == username
        );
        return {
            pageSize: getUserSetting[0].pageSize,
            category: getUserSetting[0].category,
        };
    }
    return false;
}
