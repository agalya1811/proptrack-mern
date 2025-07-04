const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
