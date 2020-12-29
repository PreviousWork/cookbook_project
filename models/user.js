const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//===============================================>
const Recipe  = require('../models/recipe');
const Ingredient  = require('../models/ingredient');
//===============================================>
const userSchema = new Schema({
  username:   {type: String, required: true, unique: true},
  password:   {type: String, required: true},
  image:      {type: String, default: 'no-image.png'},
  // name:       {type: String},
},{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

  //favorites: [{/*recipe*/}],
  //friends: [{/*user*/}],
  //preference: [{ingredient}],
  //allergies: [{ingredient}],

  //sample for populate

  // var storySchema = Schema({
  //   author: { type: Schema.Types.ObjectId, ref: 'Person' },
  //   title: String,
  //   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  // });
  
  // var Story = mongoose.model('Story', storySchema);
  // var Person = mongoose.model('Person', personSchema);
  