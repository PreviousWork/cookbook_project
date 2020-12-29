const express         = require('express');
const ensureLogin     = require("connect-ensure-login");
const router          = express.Router();
const User            = require("../models/user");
//===================================================>
router.get('/',ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req , res , next) =>{
  res.render('passport/signup');
})

router.get('/login', (req , res , next) =>{
  res.render('passport/login');
})

router.get('/tutorial', ensureLogin.ensureLoggedIn(), (req , res , next) =>{
  res.render('tutorial');
})

module.exports = router;
