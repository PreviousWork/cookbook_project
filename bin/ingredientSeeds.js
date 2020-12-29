const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Ingredient = require('../models/ingredient');
// const dbName = 'mycookbook'
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
.then(() => {
  console.log(">>>>>>>>> mongoose connected <<<<<<<<<<<")
})
.catch((err) => {
  
  console.log("there was an error =============== ", err);
})

const ingredientArr = [
  { 
    // _id: Schema.Types.ObjectId, 
    name: "Salt",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996676/ingredients/salt.png",
    description: "Salt is essential for life in general, and saltiness is one of the basic human tastes. Salt is one of the oldest and most ubiquitous food seasonings, and salting is an important method of food preservation"
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "Pepper",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996672/ingredients/whole-pepper.jpg",
    description: "Dried ground pepper has been used since antiquity both for its flavour and as a traditional medicine. Black pepper is the world's most traded spice, and is one of the most common spices added to cuisines around the world. Its spiciness is due to the chemical piperine, not to be confused with the capsaicin characteristic of chili peppers. It is ubiquitous in the modern world as a seasoning and is often paired with salt."
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "Soy Sauce",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1532322121/ingredients/soysauce.jpg",
    description: "is a liquid condiment of Chinese origin, made from a fermented paste of soybeans, roasted grain, brine, and Aspergillus oryzae or Aspergillus sojae molds."
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "Cayenne Pepper",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996658/ingredients/cayenne.jpg",
    description: "Cayenne pepper benefits are numerous and effective; it’s used to help digestion, including heal upset stomach, slow intestinal gas, stop stomach pain, stop diarrhea and as a natural remedy for cramps. It’s also used for conditions of the heart and blood vessels — including to improve poor circulation, reverse excessive blood clotting, lower high cholesterol and prevent heart disease."
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "White Pepper",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996661/ingredients/large_pepper.jpg",
    description: "Black and white peppercorns are both the fruit of the pepper plant, but they are processed differently. Black peppercorns are picked when almost ripe and sun-dried, turning the outer layer black. To produce white peppercorns, this outer layer is removed before or after drying, leaving only the inner seed"
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "Sweet Paprika",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996664/ingredients/paprika.jpg",
    description: "When a recipe simply calls for paprika, it's referring to sweet paprika. The most commonly used paprika is made from bright, sweet red peppers, making for a spice that doesn't have much heat at all. Instead, its flavor is fruity and a little bitter. Sprinkle it on deviled eggs or use it to make classic Hungarian dishes like goulash."
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "Smoked Paprika",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996664/ingredients/paprika.jpg",
    description: "Dry and smoke the red peppers over an oak fire and you've got smoked paprika, which can be made from both sweet and hot pepper varieties. You'll also see it listed as Spanish paprika or Pimentón de la Vera, as it is Spanish in origin. If it doesn't specifically say it's hot or picante, it's likely sweet, so its flavor is all about the smoke rather than heat and smoke. Use it to add smoky flavor to dishes without actually smoking them."
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "Hot Paprika",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996664/ingredients/paprika.jpg",
    description: "Made with extra-spicy red peppers, hot paprika is, of course, hot. Like cayenne or other ground chiles, a little goes a long way with this stuff. Use it in place of sweet paprika when you want to spice up your dish or if you don't happen to have cayenne or red pepper flakes on hand."
  },
  {
    // _id: Schema.Types.ObjectId, 
    name: "Vinegar",
    image: "https://res.cloudinary.com/duschand1111/image/upload/v1531996674/ingredients/vinegar.jpg",
    description: "Vinegar is commonly used in food preparation, in particular pickling liquids, and vinaigrettes and other salad dressings. It is an ingredient in sauces, such as hot sauce, mustard, ketchup, and mayonnaise. Vinegar is sometimes used in chutneys. It is often used as a condiment on its own or as part of other condiments. Marinades often contain vinegar. In terms of its shelf life, vinegar's acidic nature allows it to last indefinitely without the use of refrigeration."
  }
];
// use .create() mongoose method to create entries in DB
Ingredient.create(ingredientArr)
.then(ingred => {
    ingred.forEach(oneIngred => {
        console.log('In DB: ', oneIngred.name);
    });
    // cut off DB connection
    mongoose.disconnect();
})
.catch( err => console.log('Error while creating seeds: ', err));

module.exports = Ingredient;
