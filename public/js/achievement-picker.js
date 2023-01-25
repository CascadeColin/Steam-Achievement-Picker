const appidnumber ='0';
var game1EL = document.querySelector(".achievementname");
async function getrandomegameandachievement () {
//   try {
//     const res = await fetch("/api/ownedgames");
//     const data = await res.json();
//     for (let i = 0; i < data.lenght; i++) {
//         const appidsforgame = [];
//         appidsforgame = data[i].appid;
//     }
//     let appidnumber = Math.floor(Math.random() * data.lenght);
//     console.log(appidnumber)
//   } catch (err) {
//     console.log(err);
//   }

try {
    const res = await fetch("api/achievements");
    const data = await res.json();
    achievement1name = data[0].name;
    game1EL.textContent=achievement1name;
} catch (err) {
    console.log(err);
};
}

getrandomegameandachievement()
