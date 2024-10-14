const db = require('../db')
const {Recipe, Type, Direction}  = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const types = await Type.find()
    const direction = await Direction.find()

    const recipes = [
        {
            title: 'Vegan Tacos',
            cuisine: types[0]._id,
            ingredients: [
                { name: 'Corn Tortillas', quantity: 8, unit: 'pcs' },
                { name: 'Black Beans', quantity: 1, unit: 'cup' },
                { name: 'Avocado', quantity: 1, unit: 'pcs' }
            ],
            difficulty: 'Easy',
            dietaryRestrictions: [{
                isVegan: true,
                isGlutenFree:true,
                isVegetarian: false
            }],
            direction: null
        },
        {
            title: 'Chicken Curry',
            cuisine: types[1]._id,
            ingredients: [
                { name: 'Chicken', quantity: 500, unit: 'g' },
                { name: 'Curry Powder', quantity: 2, unit: 'tbsp' },
                { name: 'Coconut Milk', quantity: 400, unit: 'ml' }
            ],
            difficulty: 'Medium',
            dietaryRestrictions:[{
                isVegan: false,
                isGlutenFree: false,
                isVegetarian: false
            }],
            direction: null
        },
        {
            title: 'Chocolate Cake',
            cuisine: types[2]._id,
            ingredients: [
                { name: 'Flour', quantity: 250, unit: 'g' },
                { name: 'Sugar', quantity: 200, unit: 'g' },
                { name: 'Cocoa Powder', quantity: 50, unit: 'g' }
            ],
            difficulty: 'Hard',
            dietaryRestrictions: [{
                isVegan: false,
                isGlutenFree:false,
                isVegetarian: true
            }],
            direction: null
        }
    ]

   await Recipe.insertMany(recipes)
    console.log("Created some recipes!")
}

const run = async () => {
    await main()
    db.close()
}

run()
