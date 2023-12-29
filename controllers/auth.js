const passport = require('passport')
const validator = require('validator')
const User = require('../models/user')
const Fish = require ('../models/fish')
const Tank = require('../models/tank')

//  exports.getLogin = (req, res) => {
//     if (req.user) {
//       return res.redirect('/todos')
//     }
//     res.render('login', {
//       title: 'Login'
//     })
//   }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }

  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      money: 50.00,
      password: req.body.password
    })
    const tank = new Tank({
      name: 'First Tank',
      gallons: 20,
      ownerId: user._id,
      temperature: 78
    })
    const fish1 = new Fish({
      name: 'Starter Fish 1',
      species: 'Guppy',
      isMale: false,
      ownerId: user._id,
      age: 6
    })
    const fish2 = new Fish({
      name: 'Starter Fish 2',
      species: 'Guppy',
      isMale: true,
      ownerId: user._id,
      age: 6
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          Tank.create(tank).then(tankInfo => {
            fish1.tankId = tankInfo._id
            fish2.tankId = tankInfo._id
            Fish.create(fish1, fish2)
          })
          
          res.redirect('/')
        })
      })

      
    })
  }