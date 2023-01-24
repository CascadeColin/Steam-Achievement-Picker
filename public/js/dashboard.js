function randomAchievementPicker() {
    document.location.replace("/random-achievement-picker");
}
function achievementPicker() {
    const appidselector = document.querySelector('#a')
    console.log(appidselector.dataset.appid)
    document.location.replace(`/achievement-picker/${appidselector.dataset.appid}`);
}


document.querySelector(".card1").addEventListener("click", achievementPicker);
document.querySelector(".card2").addEventListener("click", achievementPicker);
document.querySelector(".card3").addEventListener("click", achievementPicker);
document.querySelector(".card4").addEventListener("click", achievementPicker);
document.querySelector(".generator-btn").addEventListener("click", randomAchievementPicker);

var game1EL = document.querySelector(".game1");
var game2EL = document.querySelector(".game2");
var game3EL = document.querySelector(".game3");
var game4EL = document.querySelector(".game4");

const games = [game1EL, game2EL, game3EL, game4EL];

async function getgamenameandimage() {
    try {
        const res = await fetch('/api/ownedgames');
        const data = await res.json();
        const gameNames = data.map(obj => obj = obj.name);

        // game1name = data[0].name;
        // game2name = data[1].name;
        // game3name = data[2].name;
        // game4name = data[3].name;
        // game1EL.textContent=game1name;
        // game2EL.textContent=game2name;
        // game3EL.textContent=game3name;
        // game4EL.textContent=game4name;
    } catch (err) {
        console.log(err);
    }
}

getgamenameandimage()

