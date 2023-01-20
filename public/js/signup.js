const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector("#email-signup").value.trim();
    // HTML form inputs return strings, but we need a number
    const steamidNum = document.querySelector("#steamid-signup").value.trim();
    const steamid = parseInt(steamidNum);
    const password = document.querySelector("#password-signup").value.trim();

    console.log(typeof email, email, typeof password, password, typeof steamid, steamid)
  
    if (email && steamid && password) {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, steamid }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up.");
      }
    }
  };
  
  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);