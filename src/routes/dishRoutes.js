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
