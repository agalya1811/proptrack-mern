const mongoose = require('mongoose');

const viewingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g. '10:00 AM'
  status: { type: String, enum: ['scheduled', 'completed', 'no-show'], default: 'scheduled' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Viewing', viewingSchema);
