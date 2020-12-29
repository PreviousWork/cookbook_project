const mongoose            = require('mongoose');
const Schema              = mongoose.Schema;
const Ingredient          = require('../models/ingredient');
const Recipe              = require('../models/recipe')
const dbName              = 'mycookbook'

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
// mongoose.connect(`mongodb://localhost/${dbName}`);

const recipeArr = [
  {
    // _id: Schema.Types.ObjectId, 
    name: "Aglio E Olio",
    image: "https://c.pxhere.com/photos/16/a7/spaghetti_bacon_pasta-863996.jpg!d",
    ingredient: "Salt, Pepper, Soy Sauce, Cayenne Pepper",
    instruction: "Salt is essential for life in general, and saltiness is one of the basic human tastes. Salt is one of the oldest and most ubiquitous food seasonings, and salting is an important method of food preservation"
  }
];
Recipe.create(recipeArr)
.then(reci => {
    reci.forEach(oneReci => {
        console.log('In DB: ', oneReci.name);
    });
    mongoose.disconnect();
})
.catch( err => console.log('Error while creating seeds: ', err));

module.exports = Recipe;
