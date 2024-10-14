const { Schema } = require('mongoose')

const recipeSchema = new Schema({
    title: { type: String, required: true },
    cuisine: { type: Schema.Types.ObjectId, ref: 'Type' },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            unit: { type: String, required: true }
        }
    ],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    dietaryRestrictions: [{
        isVegan: {type: Boolean, required: true},
        isGlutenFree:{type: Boolean, required: true},
        isVegetarian: {type: Boolean, required: true}
    }],
    direction: { type: Schema.Types.ObjectId, ref: 'Direction' }
},
{ timestamps: true }
)

module.exports = recipeSchema
