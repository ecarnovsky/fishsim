const nodemailer = require('nodemailer')

module.exports = {
    
    resetPassword:(req, res)=>{
        res.render('passwordreset.ejs')
    },

    sendEmailCode: (req, res) => {

        const code = crypto.getRandomValues(new Uint32Array(7)).join('')
        const url = `https://fishsim.onrender.com/passwordreset/${code}`
        const date = new Date()

        const emailSubject = `Reset your FishSim Password.`
        const emailBodyHTML = `<p>Click <a href="${url}">here</a> to reset your password.</p>`

        

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: emailSubject,
            html: emailBodyHTML
        }

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Password reset email sent.');
        }
        })

        res.json('Code sent.')
    }
}