const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    preparationSteps: { type: [String], required: true },
    cookingTime: { type: Number, required: true },
    origin: { type: String, required: true },
    spiceLevel: { type: String }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
