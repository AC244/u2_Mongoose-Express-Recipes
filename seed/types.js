const db = require('../db')
const {Type} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const types = [
        { name: 'Mexican', origin: 'Mexico'},
        { name: 'Indian', origin: 'India'},
        { name: 'Dessert', origin: 'Various'}
    ]

    await Type.insertMany(types)
    console.log("Created some cuisine types!")
}

const run = async () => {
    await main()
    db.close()
}

run()
