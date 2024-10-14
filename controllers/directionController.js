const { Direction } = require('../models')

// Get index
const getAllDirections = async (req, res) => {
    try {
        const { recipeId } = req.query
        const filter = {}
        if (recipeId) filter.recipe = recipeId

        const directions = await Direction.find(filter).populate('recipe')
        res.json(directions)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// Get show
const getDirectionById = async (req, res) => {
    try {
        const { id } = req.params
        const direction = await Direction.findById(id).populate('recipe')
        if (direction) {
            return res.json(direction)
        }
        return res.status(404).send('Direction with the specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// Create -> post
const createDirection = async (req, res) => {
    try {
        const direction = await new Direction(req.body)
        await direction.save()
        return res.status(201).json(direction)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Update -> put
const updateDirection = async (req, res) => {
    try {
        const { id } = req.params
        const direction = await Direction.findByIdAndUpdate(id, req.body, { new: true })
        if (direction) {
            return res.status(200).json(direction)
        }
        throw new Error("Direction not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// Delete -> delete
const deleteDirection = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Direction.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Direction deleted")
        }
        throw new Error("Direction not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllDirections,
    getDirectionById,
    createDirection,
    updateDirection,
    deleteDirection
}
