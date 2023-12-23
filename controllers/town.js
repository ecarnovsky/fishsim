module.exports = {
    getTown: (req, res) => {
        console.log(req.user)
        res.render('town.ejs')
    }
}