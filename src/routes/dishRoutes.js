const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');




// GET - Get all dishes
router.get('/api/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// GET - Get dish by ID
router.get('/api/dish', async (req, res) => {
    const { name } = req.query;
  
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
  
        const dishes = await Dish.find({ name: { $regex: name, $options: 'i' } });
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// POST - Create new dish
router.post('/api/dish', async (req, res) => {
    const { name, ingredients, preparationSteps, cookingTime, origin, spiceLevel } = req.body;
  
    try {
        const existingDish = await Dish.findOne({ name });
        if (existingDish) {
            return res.status(409).json({ message: 'Dish already exists' });
        }
  
        const newDish = new Dish({ name, ingredients, preparationSteps, cookingTime, origin, spiceLevel });
        await newDish.save();
        res.status(201).json(newDish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});