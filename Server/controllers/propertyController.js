const Property = require('../models/Property');

// GET all with filters/pagination
exports.getAllProperties = async (req, res) => {
  try {
    const {
      minPrice, maxPrice, location, type,
      bedrooms, bathrooms, amenities, page = 1, limit = 10
    } = req.query;

    let query = { isActive: true };

    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = type;
    if (bedrooms) query.bedrooms = bedrooms;
    if (bathrooms) query.bathrooms = bathrooms;
    if (amenities) query.amenities = { $all: amenities.split(',') };

    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json(property);
  } catch (err) {
    res.status(404).json({ error: 'Property not found' });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'Property not found' });
  }
};

exports.archiveProperty = async (req, res) => {
  try {
    const archived = await Property.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.status(200).json(archived);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
