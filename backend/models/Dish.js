// backend/models/Dish.js
const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dish: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Dish', DishSchema);

