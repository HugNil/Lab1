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




// PUT - Update existing dish
router.put('/api/dishes/:id', async (req, res) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
  
        res.json(updatedDish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// DELETE - Delete existing dish
router.delete('/api/dish/:id', async (req, res) => {
    try {
        const dishes = await Dish.findByIdAndDelete(req.params.id);
        if (!dishes) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json({ message: 'Dish deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
  
module.exports = router;
