const generatorBtnEl = document.querySelector(".generator-btn");

function getRandomAchievement() {
  // fetching from the api/achievements route > the user's achievements should be posted/stored in our database once they log in
  fetch("api/achievements").then(function (response) {
    return response.json();
  })
//   this fetches to Steam's API
//   var queryURL =
//     "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=" +
//     appid +
//     "&key=44D93B900F98F86928735D47D2E3DD69" +
//     "&steamid=" +
//     steamid;
//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     })
    .then(function (data) {
      // filter out only completed achievements
      const completedAchievement = json
        .parse(data)
        .filter(({ achieved }) => achieved === 1);
      console.log(json.parse(data).filter(({ achieved }) => achieved === 0));
      // pick a random achievement from this completedAchievement variable

      // select a random achievement from this array
    });
}

generatorBtnEl.addEventListener("click", getRandomAchievement);
