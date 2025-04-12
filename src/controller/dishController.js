const Dish = require('../models/dish');



// GET - Get all dishes
const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find(); // Retrieves all dishes from the database
        if (!dishes || dishes.length === 0) {
            return res.status(404).json({ message: 'No dishes found' }); // Returns 404 if no dishes are found
        }
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// GET - Get dish by name
const getDishByName = async (req, res) => {
    const { name } = req.query;  // Retrieve name from query parameters
  
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
  
        const dishes = await Dish.find({ name: { $regex: name, $options: 'i' } });  // Search for dishes based on name
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// POST - Create new dish
const addDish = async (req, res) => {
    const { name, ingredients, preparationSteps, cookingTime, origin, spiceLevel } = req.body;
  
    try {
        const existingDish = await Dish.findOne({ name }); // Searches for existing dish by name
        if (existingDish) {
            return res.status(409).json({ message: 'Dish already exists' });
        }
  
        const newDish = new Dish({ name, ingredients, preparationSteps, cookingTime, origin, spiceLevel }); // Creates a new dish object
        await newDish.save(); // Saves the new dish to the database
        res.status(201).json(newDish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// UPDATE - Update existing dish
const updateDish = async (req, res) => {
    try {
        // Retreives ID from URL parameters
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Updates the dish with the provided ID using the request body
  
        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
  
        res.json(updatedDish); // Return the updated dish
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// DELETE - Delete existing dish
const deleteDish = async (req, res) => {
    try {
        const dishes = await Dish.findByIdAndDelete(req.params.id); // Deletes the dish with the provided ID
        if (!dishes) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json({ message: 'Dish deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllDishes, getDishByName, addDish, updateDish, deleteDish };
