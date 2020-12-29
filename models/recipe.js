const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//===============================================>
const User  = require('../models/user');
const Ingredient  = require('../models/ingredient');
//===============================================>
const recipeSchema = new Schema({
  maker: {type: Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
  image: {type: String, default:'no-image.png'},
  ingredient: [{type: String, default:'insert-ingredients'}],
  instruction: {type: String, default:'insert-instructions'}
});
const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;


//  ingredient: 
//  [{
//     ingredient,  
//     amount:{type: Number, default: 1},
//     measurement: {type: String, enum:['cup','1/2 cup','1/3 cup','1/4 cup','1/8 cup','1/16 cup','teaspoon','tablespoon','pinch','dash','pint','quart','gallon','pound','pounds','kg','kgs']},
//  }],
