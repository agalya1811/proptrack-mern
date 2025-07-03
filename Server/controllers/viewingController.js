const Viewing = require('../models/Viewing');

exports.createViewing = async (req, res) => {
  try {
    const newViewing = new Viewing(req.body);
    const saved = await newViewing.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateViewingStatus = async (req, res) => {
  try {
    const updated = await Viewing.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
