fetch('https://fishsim.onrender.com/dailyturnover', {
    method: 'PUT',
    body: JSON.stringify({
        CRON_JOB_GITHUB_KEY: process.env.CRON_JOB_GITHUB_KEY
    })
})
    .then(json => console.log("Successful day change"))
    .catch (err => console.log(err))