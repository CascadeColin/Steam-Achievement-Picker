// import modules

Class Users extends Model {}

// db columns
// 1) email - will double up as username
// 2) password - hashed using bcrypt
// 3) SteamID - will be user-provided as we can't fetch that directly
// 4) OwnedGames - will be done in the background on account creation.  FETCH GetOwnedGames on account creation via SteamID  (fulfils the POST req requirement - users can update owned games manually)