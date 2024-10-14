const { Schema } = require('mongoose')

const directionSchema = new Schema({
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
    steps: [
        {
            instruction: { type: String, required: true },
            order: { type: Number, required: true }
        }]
       },
     { timestamps: true }
)

module.exports = directionSchema
