function achievementPicker() {
    document.location.replace("/achievement-picker");
}


document.querySelector(".card1").addEventListener("click", achievementPicker);
document.querySelector(".card2").addEventListener("click", achievementPicker);
document.querySelector(".card3").addEventListener("click", achievementPicker);
document.querySelector(".card4").addEventListener("click", achievementPicker);
document.querySelector(".generator-btn").addEventListener("click", achievementPicker);

var game1EL = document.querySelector(".game1");
var game2EL = document.querySelector(".game2");
var game3EL = document.querySelector(".game3");
var game4EL = document.querySelector(".game4");


//FIXME:get the name and image of the 4 games showcased on the dashboard page
async function  getgamenameandimage() {
    try {
        const res = await fetch('/api/ownedgames');
        const data = await res.json();
        game1name = data[0].name;
        game2name = data[1].name;
        game3name = data[2].name;
        game4name = data[3].name;
        urlimage1 = data[0].img_icon_url;
        urlimage2 = data[1].img_icon_url;
        urlimage3 = data[2].img_icon_url;
        urlimage4 = data[3].img_icon_url;
        game1EL.text(""+game1name);
        //TODO:get the hash number for each image and then complete the full url for the image
    } catch (err) {
        console.log(err);
    }
}

getgamenameandimage()

card1BtnEl.addEventListener("click", getAchievementByGame);
card2BtnEl.addEventListener("click", getAchievementByGame);
card3BtnEl.addEventListener("click", getAchievementByGame);
card4BtnEl.addEventListener("click", getAchievementByGame);

// randomly pick 4 games from ownedgame table in db

