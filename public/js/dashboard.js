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


async function  getgamenameandimage() {
    try {
        const res = await fetch('/api/ownedgames');
        const data = await res.json();
        game1name = data[0].name;
        game2name = data[1].name;
        game3name = data[2].name;
        game4name = data[3].name;
        game1EL.textContent=game1name;
        game2EL.textContent=game2name;
        game3EL.textContent=game3name;
        game4EL.textContent=game4name;
    } catch (err) {
        console.log(err);
    }
}

getgamenameandimage()

