const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    preparationSteps: { type: [String], required: true },
    cookingTime: { type: Number, required: true },
    origin: { type: String, required: true },
    spiceLevel: { type: String }
});

const Dish = mongoose.model('Dish', dishSchema); // Create a model based on the schema

module.exports = Dish;
