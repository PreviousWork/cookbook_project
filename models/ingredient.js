const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//===============================================>
const User  = require('../models/user');
const Recipe  = require('../models/recipe');
//===============================================>
const ingredientSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  name:        {type: String},
  image:       {type: String},
  description: {type: String, default: "insert-description"}
});

const Ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = Ingredient;