module.exports = {
    getForums: (req,res)=>{
        res.render('forums.ejs', {user: req.user})
    }
}