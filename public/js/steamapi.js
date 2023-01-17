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
        //just to show how to get data from the api
         SteamID = data.response.players.steamid;
    })
}

function UsersGameData(){
    var queryURL = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key="+apikey+"&steamid="+steamid+"&format=jsonArguments";
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        //show the current number of games the user has
         gameCount = data.response.game_count;
         //shows the appid for each game
        for(var i = 0; i <  gameCount; i++){
            //TODO:create an array that will take all the appid for each game 
        }
    })
}

//gets the name of the game and achievemnts for each appid
function GameData(){
    var queryURL = "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+appid+"key="+apikey+"&steamid="+steamid;
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        GameName = data.playerstats.gameName;
        //TODO:create an array that will get the name for each game
        //TODO:create an array that will get achievements that have been completed
        //TODO:create an array that will get achievements that have not been completed
    })
}

//gets the users friends list
function FriendsData(){
    var queryURL = " http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+apikey+"&steamid="+steamid+"&relationship=friend";
    fetch(queryURL)
    .then(function(response){
       return response.json();
    })
    .then(function (data) {
        //TODO:create an array that will store a friends steam id and use the steam id to make a fetch request from the api to be able to get the firends name or username
    })
}
