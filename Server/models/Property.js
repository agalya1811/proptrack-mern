const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  type: { type: String, enum: ['rent', 'sale'], required: true },
  location: { type: String, required: true },
  amenities: [String],
  images: [String], // can be base64 or URLs
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Index for filtering
propertySchema.index({ price: 1 });
propertySchema.index({ location: 'text' });
propertySchema.index({ type: 1 });

module.exports = mongoose.model('Property', propertySchema);
