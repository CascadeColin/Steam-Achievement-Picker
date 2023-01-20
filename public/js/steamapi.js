var apikey = "44D93B900F98F86928735D47D2E3DD69";


//TODO:After login/signup the steamid for the user should be gotten from the input
buttonName.on("click", function(){
    var steamid = $("theClassOrId");
    steamid = steamid .val().trim();
    //TODO:call the fuction after login or signup button has been clicked
})

function UserData(){
    var queryURL = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+apikey+"&steamids="+steamid;
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        //demo
        //just to show how to get data from the api
         SteamID = data.response.players.steamid;
    })
}

//gets the appid for each game, the name of the game and also the achievemnts for each game both completed and uncompleted
function UsersGameData(){
    var queryURL = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+apikey+"&steamid="+steamid+"&format=jsonArguments&include_appinfo=true";
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        //show the current number of games the user has
         gameCount = data.response.game_count;
         //shows the appid for each game
         const gamesAppId =Array(gameCount).fill(null)
        for(var i = 0; i <  gameCount; i++){
            gamesAppId[i] = data.response.games[i].appid;
            gamesName[i] = data.response.games[i].name;
            return gamesAppId[i];
        }
    })
    .then(function (gamesAppId) {
        gamesAppId.forEach( appID => {
            var queryURL = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+appID+"key="+apikey+"&steamid="+steamid;
            fetch(queryURL)
            .then(function(response){
               return response.json();
            })
            .then(function (data) {
                achievementCount = data.playerstats.achievements.lenght;
                const achievementscompletedname =[];
                const achievementsuncompletedname = [];
                for(var i = 0; i <  achievementCount; i++){
                    if (data.playerstats.achievements[i].achieved === 1) {
                        achievementCompleted = achievementCompleted + 1;
                        achievementscompletedname[i] = data.playerstats.achievements[i].apiname;
                    } else {
                        achievementsUncompleted = achievementsUncompleted + 1;
                        achievementsuncompletedname[i] = data.playerstats.achievements[i].apiname
                    }
                }
            })
        });
    })
}

//gets the users friend's name
function FriendsSteamID(){
    var queryURL = " http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+apikey+"&steamid="+steamid+"&relationship=friend";
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        friendsCount = data.friendslist.friends.lenght;
        const friendsSteamId = [];
        for(var i = 0; i <  friendsCount; i++){
            friendsSteamId[i] = data.friendslist.friends[i].steamid;
        }
        return friendsSteamId;
    })
    .then(function (friendsSteamId) {
        const friendsname = [];
        friendsSteamId.forEach( id => {
            var queryURL = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+apikey+"9&steamids="+id;
            fetch(queryURL)
            .then(function(response){
               return response.json();
            })
            .then(function (data) {
                friendsname.push(data.response.players.personaname)
            })
        });
    })
}

//TODO:create a function that will fetch the logo for each game 