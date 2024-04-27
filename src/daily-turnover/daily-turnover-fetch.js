require('dotenv').config({path: './src/config/.env'})

dfetch('https://fishsim.onrender.com/dailyturnover', {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
        CRON_JOB_GITHUB_KEY: process.env.CRON_JOB_GITHUB_KEY
    })
})
    .then(json => {
        console.log("Fetch request done.")
    })
    .catch (err => console.log(err))