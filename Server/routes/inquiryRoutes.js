const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// GET all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('propertyId');
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST /api/inquiries
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    // Optional: validate fields here

    const newInquiry = new Inquiry({ name, email, phone, message, propertyId });
    const saved = await newInquiry.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
