const db = require('../db')
const {Direction, Recipe} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const recipes = await Recipe.find()

    const directions = [
        {
            recipe: recipes[0]._id,
            steps: [
                { instruction: 'Warm the tortillas.', order: 1 },
                { instruction: 'Add black beans and avocado.', order: 2 },
                { instruction: 'Serve with salsa.', order: 3 }
            ]
        },
        {
            recipe: recipes[1]._id,
            steps: [
                { instruction: 'Cook chicken in a pan.', order: 1 },
                { instruction: 'Add curry powder and coconut milk.', order: 2 },
                { instruction: 'Simmer for 20 minutes.', order: 3 }
            ]
        },
        {
            recipe: recipes[2]._id,
            steps: [
                { instruction: 'Mix dry ingredients.', order: 1 },
                { instruction: 'Add wet ingredients and mix.', order: 2 },
                { instruction: 'Bake at 180°C for 30 minutes.', order: 3 }
            ]
        }
    ]

    await Direction.insertMany(directions)
    console.log("Created some directions!")
}

const run = async () => {
    await main()
    db.close()
}

run()
