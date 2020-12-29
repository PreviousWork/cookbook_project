const express        = require("express");
const router         = express.Router();
const ensureLogin    = require("connect-ensure-login");
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;
const passport       = require("passport");
const mongoose       = require("mongoose");
const User           = require("../models/user");
const Recipe         = require("../models/recipe")
const Ingredient     = require("../models/ingredient")
//========================>
const session        = require('express-session');
const MongoStore     = require('connect-mongo')(session);
const flash          = require('connect-flash');
const LocalStrategy  = require('passport-local').Strategy;
//========================>
const multer         = require('multer');
const uploadCloud    = require('../config/cloudinary');
//========================>
//this one ensures that the user is logged-in for them to be able to enter
//========================> PRIVATE
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
  console.log(process.env.blah);
});
//========================> USER
router.get("/user", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/user", { user: req.user });
});
//========================> RECIPE
router.get("/recipes", ensureLogin.ensureLoggedIn(), (req, res) => {
  Recipe.find()
  .then((theRecipes)=>{
  res.render("passport/recipes", { user: req.user, recipes: theRecipes});
  })
  .catch((err)=>{
  next("error"); 
 })
});
//========================>
//    recipe edit
//========================>

router.post('/recipes/edit/:id', (req, res, next)=>{
  console.log('body body: ', req.body)
  const recipeId = req.params.id;
  const updatedRecipe = {
      name: req.body.name,
      image:req.body.image,
      ingredient:req.body.ingredient,
      instruction: req.body.instruction
  }
  Recipe.findByIdAndUpdate(recipeId, updatedRecipe)
  .then( () => {
      res.redirect('/recipes')
  })
  .catch((err)=>{
      next(err);
  }) 
})

//========================>
//    recipe delete
//========================>

router.post('/recipes/:id/delete', (req, res, next)=> {
  const id = req.params.id;
  Recipe.findByIdAndRemove(id)
  .then( ()=> {
  res.redirect('/recipes');
  })
  .catch( err => {
    console.log("Error while deleting recipe", err);
  })
})

//========================>
//    recipe add
//========================>

  router.post('/recipes/create', uploadCloud.single('photo'), (req, res, next)=>{
    console.log(req.file);
    const newRecipe = new Recipe({
    maker: req.user._id,
    name: req.body.name,
    image: req.file.url,
    ingredient:req.body.ingredient,
    instruction: req.body.instruction
   });
  
   newRecipe.save()
   .then((savedrecipe)=>{
     console.log('here: ', savedrecipe)
       res.redirect('/recipes')
   })
   .catch((err)=>{
       next(err);
   }) 
  });

//=========================================> 
//  ingredients
//=========================================> 

router.get("/ingredients", ensureLogin.ensureLoggedIn(), (req, res) => {
  Ingredient.find()
  .then((theIngredient)=>{
  res.render("passport/ingredient", { user: req.user, ingredient: theIngredient });
  })
  .catch((err)=>{
  next("error"); 
  })
});
//==========================================>
//    signup
//==========================================> 

router.get("/signup", (req, res, next) => {
  res.render("passport/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("passport/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(responseFromDB => {
    if (responseFromDB !== null) {
      res.render("passport/signup", { message: "The username already exists" });
      res.redirect("/login");
      return;
    }

    const salt      = bcrypt.genSaltSync(bcryptSalt);
    const hashPass  = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("passport/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/login");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});
//=========================================> 
//  authentication
//=========================================> 

router.get("/login", (req, res, next) => {
  res.render("passport/login", {'message': req.flash("error") });
});     

router.post("/login", 
  passport.authenticate("local", {
  successRedirect: "/private-page",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//==========================================>
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

//========================================>
// new
//========================================>

router.get('/recipes/new', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
  Ingredient.find()
      .then((allIngredients)=>{
          res.render('passport/newRecipe', { allIngredients: allIngredients })
      })
      .catch((err)=>{
          console.log("Error: ==========>");
          next(err);
      })
  });

//==========================================>
// details
//==========================================>

router.get('/recipes/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let id = req.params.id;
  Recipe.findOne({'_id': id})
    .then(recipe => {
      res.render("passport/recipeDetail", { recipe:recipe })
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/recipes/edit/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let recipeId = req.params.id;
  Recipe.findById(recipeId)
    .then(recipe => {
      Ingredient.find()
      .then( allIngredients => {
        let newArr;
        recipe.ingredient.forEach((oneIngredient, index) => {
          if(allIngredients[index].name === oneIngredient){
            allIngredients[index].yes = true;
          }
        })
        res.render("passport/editRecipe", { recipe:recipe, ingredients: allIngredients })
      } )
    })
    .catch(error => {
      console.log(error)
    })
}); 

module.exports = router;