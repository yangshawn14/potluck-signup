// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Dish = require('./models/Dish');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


// Routes
app.get('/dishes', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dishes' });
    }
});

app.post('/dishes', async (req, res) => {
    try {
        const { name, dish } = req.body;
        console.log('Received:', name, dish);
        const newDish = new Dish({ name, dish });
        await newDish.save();
        res.status(201).json(newDish);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add dish' });
    }
});

app.delete('/dishes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Dish.findByIdAndDelete(id);
        res.json({ message: 'Dish deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete dish' });
    }
});

app.put('/dishes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, dish } = req.body;
        const updatedDish = await Dish.findByIdAndUpdate(
            id,
            { name, dish },
            { new: true }
        );
        res.json(updatedDish);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update dish' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
