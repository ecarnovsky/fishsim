const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const User = require('../models/user')


module.exports = {

    resetPassword:(req, res)=>{
        res.render('passwordreset.ejs')
    },

    sendEmailCode: async (req, res) => {

        let userEmail = process.env.EMAIL

        const token = crypto.getRandomValues(new Uint32Array(40)).join('')
        const url = `https://fishsim.onrender.com/passwordreset/${token}`
        const date = new Date()


         bcrypt.genSalt(10, (err, salt) => {
            if (err) { return err }
             bcrypt.hash(token, salt, async (err, hash) => {
                if (err) { return err }
                const hashedToken = hash
                await User.findOneAndUpdate({email: userEmail}, {passwordResetToken: hashedToken, passwordResetTokenDate: date})
            })
        })

        

        const emailSubject = `Reset your FishSim Password.`
        const emailBodyHTML = `<p>Click <a href="${url}">here</a> to reset your password.</p>`

        console.log("test", url.length)

        

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: userEmail,
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

        res.json('Email sent.')
    }
}