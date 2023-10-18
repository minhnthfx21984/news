"use strict";

const newsContainer = document.querySelector("#news-container");
const buttonPrevious = document.querySelector("#btn-prev");
const pageNum = document.querySelector("#page-num");
const buttonNext = document.querySelector("#btn-next");

let totalPost = 0;

// DEFAULT PARAMETER FOR SHOWING POST
const requestParameters = {
  apiKey: "7d4e645953eb4f348c5e5a275d7b6f65",
  pageSize: 10,
  page: 1,
  category: "general",
};

// get user setting
if (getSetting(CurrentUser.data.username)) {
  let setting = getSetting(CurrentUser.data.username);
  requestParameters.pageSize = setting.pageSize;
  requestParameters.category = setting.category;
}

// RENDER ALL POST WHEN VISITED PAGE
renderAllPost(requestParameters);

// BUTTON NEXT PAGE ON CLICK
buttonNext.addEventListener("click", function () {
  if (
    requestParameters.page <
    totalPost / parseInt(requestParameters.pageSize)
  ) {
    requestParameters.page += 1;
    renderAllPost(requestParameters);
    pageNum.textContent = requestParameters.page;
    checkPage();
  }
});

// BUTTON PREVIOUS PAGE ON CLICK
buttonPrevious.addEventListener("click", function () {
  if (requestParameters.page > 1) {
    requestParameters.page -= 1;
    renderAllPost(requestParameters);
    pageNum.textContent = requestParameters.page;
    checkPage();
  }
});

// CHECK PAGE FUNCTION
function checkPage() {
  if (requestParameters.page <= 1) {
    buttonPrevious.classList.add("hidden");
  } else {
    buttonPrevious.classList.remove("hidden");
  }

  if (
    requestParameters.page >=
    totalPost / parseInt(requestParameters.pageSize)
  ) {
    buttonNext.classList.add("hidden");
  } else {
    buttonNext.classList.remove("hidden");
  }
}

// RENDER POST FUNCTION
function renderAllPost(requestParameters) {
  getData(requestParameters)
    .then((data) => {
      totalPost = data.totalResults;
      // check page and hide button
      checkPage();
      return data.articles;
    })
    .then((data) => {
      console.log(data);
      let html = "";
      data.map((e) => {
        html += renderPost(e);
      });
      newsContainer.innerHTML = html;
    });
}

// GET DATA FROM API FUNCTION
async function getData(requestParameters) {
  try {
    const parameter = await toParameters(requestParameters);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us${parameter}`,
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// CONVERT REQUEST PARAMETER OBJECT TO STRING URL
async function toParameters(requestParameters) {
  let parameter = "";
  Object.keys(requestParameters).forEach((key) => {
    parameter += `&${key}=${requestParameters[key]}`;
  });
  return parameter;
}

function renderPost(post) {
  // author, content, description, publishedAt, title, url, urlToImage
  return `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-lg-5">
                <img
                    src="${
                      post.urlToImage
                        ? post.urlToImage
                        : "https://liftlearning.com/wp-content/uploads/2020/09/default-image.png"
                    }"
                    class="img-fluid rounded-start"
                />
            </div>
            <div class="col-lg-7">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">
                        ${post.description}
                    </p>
                    <p class="card-text">
                       <button class="btn btn-primary">View</button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;
}

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
      (e) => e.username == username,
    );
    return {
      pageSize: getUserSetting[0].pageSize,
      category: getUserSetting[0].category,
    };
  }
  return false;
}
