const express = require('express');
const router = express.Router();
const Viewing = require('../models/viewing');

// Schedule a new viewing
router.post('/', async (req, res) => {
  try {
    const viewing = new Viewing(req.body);
    const savedViewing = await viewing.save();
    res.status(201).json(savedViewing);
  } catch (err) {
    res.status(500).json({ error: 'Failed to schedule viewing' });
  }
});

// Update viewing status (completed / no-show) and notes
router.put('/:id', async (req, res) => {
  try {
    const updatedViewing = await Viewing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedViewing);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update viewing' });
  }
});

// PATCH /api/viewings/:id
router.patch('/:id', async (req, res) => {
  try {
    const updatedViewing = await Viewing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedViewing) {
      return res.status(404).json({ message: 'Viewing not found' });
    }
    res.json(updatedViewing);
  } catch (err) {
    console.error('Error updating viewing:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all viewings (optional filter by property or client)
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.property) query.property = req.query.property;
    if (req.query.client) query.client = req.query.client;

    const viewings = await Viewing.find(query).populate('client property');
    res.json(viewings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch viewings' });
  }
});

module.exports = router;
