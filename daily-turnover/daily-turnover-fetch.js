fetch('https://fishsim.onrender.com/dailyturnover', {
    method: 'PUT'
})
    .then(json => console.log("Successful day change"))
    .catch (err => console.log(err))