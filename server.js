const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const logger = require('morgan')
const typeController = require('./controllers/typeController')
const recipeController = require('./controllers/recipeController')
const directionController = require('./controllers/directionController')

const PORT = process.env.PORT || 3001

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

app.get('/', (req, res) => res.send('Welcome to my recipe API'))

// Type routes
app.get('/types', typeController.getAllTypes)
app.get('/types/:id', typeController.getTypeById)
app.post('/types', typeController.createType)
app.put('/types/:id', typeController.updateType)
app.delete('/types/:id', typeController.deleteType)
app.get('/types/:name', typeController.getTypeByName)

// Recipe routes
app.get('/recipes', recipeController.getAllRecipes)
app.get('/recipes/:id', recipeController.getRecipeById)
app.post('/recipes', recipeController.createRecipe)
app.put('/recipes/:id', recipeController.updateRecipe)
app.delete('/recipes/:id', recipeController.deleteRecipe)
app.get('/recipes', recipeController.getRecipesByQuery)

// Direction routes
app.get('/directions', directionController.getAllDirections)
app.get('/directions/:id', directionController.getDirectionById)
app.post('/directions', directionController.createDirection)
app.put('/directions/:id', directionController.updateDirection)
app.delete('/directions/:id', directionController.deleteDirection)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
