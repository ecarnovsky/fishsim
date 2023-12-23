module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    },
    getFish: (req,res)=> {
        res.render('fish.ejs')
    }
}