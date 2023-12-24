module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', {user: req.user})
    },
    getFish: (req,res)=> {
        res.render('fish.ejs')
    }
}