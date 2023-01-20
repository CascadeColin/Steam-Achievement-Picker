/* This is where helper functions will go. */

/* If this syntax is new to you, it is just storing helper functions as methods of "module.exports" and works the same way as how we've done it before. */

module.exports = {
    // TODO: will check if user is logged in or not and render the view accordingly
    loginState: () => {},
    // checks for errors in response from Steam API when we call it
    // Steam API will return status 200 when working, and status 300-500 if it's down.
    checkStatus: (res) => {
        // res.status is between 200 and 299
        if (res.ok) res; 
        // res.status provides the status code (i.e. 404), res.statusText provides description (i.e. "Not Found")
        alert(`Steam API error: ${res.status} ${res.statusText}`);
    }
};