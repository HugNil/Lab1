const express = require('express');
const router = express.Router();
const { getAllDishes, getDishByName, addDish, updateDish, deleteDish, getDishById } = require('../controller/dishController');




// GET - Get all dishes
router.get('/api/dishes', getAllDishes);

// GET - Get dish by ID
router.get('/api/dish/:name', getDishByName);

router.get('/api/dish/id/:id', getDishById);

// POST - Create new dish
router.post('/api/dish', addDish);

// PUT - Update existing dish
router.put('/api/dish/:id', updateDish);
  
// DELETE - Delete existing dish
router.delete('/api/dish/:id', deleteDish);
  
module.exports = router;
