const { Type } = require('../models')


const getAllTypes = async (req, res) => {
    try {
        const { name, origin } = req.query
        const filter = {}
        if (name) filter.name = new RegExp(name, 'i') 
        if (origin) filter.origin = new RegExp(origin, 'i')

        const types = await Type.find(filter)
        res.json(types)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getTypeByName = async (req, res) => {
    try {
        const { name } = req.params;
        const type = await Type.findOne({ name: new RegExp(name, 'i') })
        if (type) {
            return res.json(type)
        }
        return res.status(404).send('Type not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const getTypeById = async (req, res) => {
    try {
        const { id } = req.params
        const type = await Type.findById(id)
        if (type) {
            return res.json(type)
        }
        return res.status(404).send('Type with the specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const createType = async (req, res) => {
    try {
        const type = await new Type(req.body)
        await type.save()
        return res.status(201).json(type)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const updateType = async (req, res) => {
    try {
        const { id } = req.params
        const type = await Type.findByIdAndUpdate(id, req.body, { new: true })
        if (type) {
            return res.status(200).json(type)
        }
        throw new Error("Type not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const deleteType = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Type.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Type deleted")
        }
        throw new Error("Type not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllTypes,
    getTypeById,
    getTypeByName,
    createType,
    updateType,
    deleteType
}
