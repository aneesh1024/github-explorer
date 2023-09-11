const API_URL = "https://api.github.com/users/";
const app = document.querySelector("#app");
const cardBox = document.querySelector(".card");
const loader = document.querySelector(".loader");

const getUser = async (username) => {
  cardBox.innerHTML = "";
  loader.classList.add("show");
  const response = await fetch(API_URL + username);
  const data = await response.json();
  console.log(data);
  const card = `
        <div class="search-details">
          <div class="left">
            <div class="user-image">
              <img
                src="${data.avatar_url}"
                alt=""
              />
            </div>
          </div>
          <div class="right">
            <a href="${data.html_url}" class="user-name">${data.name}</a>
            <div class="user-details">
              <div class="user-bio">${data.bio}</div>
              <div class="user-info">
                <span>${data.following}<strong>Following</strong></span>
                <span>${data.followers}<strong>Followers</strong></span>
                <span>${data.public_repos}<strong>Repos</strong></span>
              </div>
              <div class="user-repos">
                
              </div>
            </div>
          </div>
        </div>
  `;
  if (!data.avatar_url) {
    cardBox.innerHTML = "<h1>User does not exist</h1>";
  } else {
    cardBox.innerHTML = card;
  }
  getRepos(username);
  loader.classList.remove("show");
};

const getRepos = async (username) => {
  const repos = document.querySelector(".user-repos");
  const response = await fetch(API_URL + username + "/repos");
  const data = await response.json();
  data.forEach((item) => {
    const element = document.createElement("a");
    element.classList.add("repo");
    element.href = item.html_url;
    element.target = "_blank";
    element.innerText =
      item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name;
    repos.appendChild(element);
  });
};

const searchBox = document.querySelector("#username");
const formSubmit = () => {
  if (searchBox.value !== "") {
    getUser(searchBox.value);
  }
  return false;
};

searchBox.addEventListener("focusout", () => {
  formSubmit();
  if (searchBox.value === "") {
    loader.classList.remove("show");
  }
});
