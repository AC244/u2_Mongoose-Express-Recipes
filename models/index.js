const mongoose = require('mongoose')
const typeSchema = require('./type')
const recipeSchema = require('./recipe')
const directionSchema = require('./direction')

const Type = mongoose.model('Type', typeSchema)
const Recipe = mongoose.model('Recipe', recipeSchema)
const Direction = mongoose.model('Direction', directionSchema)

module.exports = {
  Type,  
  Recipe,
  Direction
}
