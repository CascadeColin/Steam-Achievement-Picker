const btn = document.querySelector('#achievement');

const getAchievements = async () => {
    try {
        // call web server api
        const res = await fetch('/achievements');
        const data = await res.json();
        // see data before manipulating it
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

btn.addEventListener('click', getAchievements);