const mongoose = require('mongoose');

const viewingSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  scheduledAt: { type: Date, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'no-show'],
    default: 'scheduled',
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Viewing', viewingSchema);
