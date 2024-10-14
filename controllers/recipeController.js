const { Recipe } = require('../models')


const getAllRecipes = async (req, res) => {
    try {
        const { title, difficulty } = req.query
        const filter = {}
        if (title) filter.title = new RegExp(title, 'i') 
        if (difficulty) filter.difficulty = difficulty

        const recipes = await Recipe.find(filter).populate('cuisine')
        res.json(recipes)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getRecipesByQuery = async (req, res) => {
    try {
        const { name, vegan, glutenFree } = req.query

        const query = {}
        if (name) {
            query.title = new RegExp(name, 'i')
        }
        if (vegan !== undefined) {
            query['dietaryRestrictions.isVegan'] = vegan === 'true'
        }
        if (glutenFree !== undefined) {
            query['dietaryRestrictions.isGlutenFree'] = glutenFree === 'true'
        }

        const recipes = await Recipe.find(query).populate('cuisine').populate('direction')
        return res.json(recipes);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id)
        if (recipe) {
            return res.json(recipe)
        }
        return res.status(404).send('Recipe with the specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const createRecipe = async (req, res) => {
    try {
        const recipe = await new Recipe(req.body)
        await recipe.save()
        return res.status(201).json(recipe)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true })
        if (recipe) {
            return res.status(200).json(recipe)
        }
        throw new Error("Recipe not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Recipe.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Recipe deleted")
        }
        throw new Error("Recipe not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllRecipes,
    getRecipeById,
    getRecipesByQuery,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
