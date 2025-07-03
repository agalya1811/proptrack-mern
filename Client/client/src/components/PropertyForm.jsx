import React, { useState, useEffect } from 'react';
import useDashboardStore from '../store/dashboardStore';

const initialFormState = {
  title: '',
  description: '',
  price: '',
  type: 'rent',
  location: '',
  amenities: '',
  images: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
};

const PropertyForm = ({ property, onClose }) => {
  const isEdit = !!property?._id;
  const [form, setForm] = useState(initialFormState);
  const { addProperty, updateProperty } = useDashboardStore();

  useEffect(() => {
    if (isEdit) {
      setForm({
        ...property,
        amenities: property.amenities?.join(', ') || '',
        images: property.images?.join(', ') || '',
      });
    }
  }, [property]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      amenities: form.amenities.split(',').map(a => a.trim()),
      images: form.images.split(',').map(i => i.trim()),
    };

    try {
      if (isEdit) {
        await updateProperty(property._id, payload);
      } else {
        await addProperty(payload);
      }
      onClose();
    } catch (err) {
      alert('Error saving property');
    }
  };

  return (
    <div className="border p-4 mb-6">
      <h3 className="font-semibold mb-4">{isEdit ? 'Edit Property' : 'Add Property'}</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="border p-2 w-full" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required className="border p-2 w-full" />
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 w-full">
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required className="border p-2 w-full" />
        <input name="amenities" value={form.amenities} onChange={handleChange} placeholder="Amenities (comma separated)" className="border p-2 w-full" />
        <input name="images" value={form.images} onChange={handleChange} placeholder="Images URLs (comma separated)" className="border p-2 w-full" />
        <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="border p-2 w-full" />
        <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="border p-2 w-full" />
        <input name="area" type="number" value={form.area} onChange={handleChange} placeholder="Area (sq ft)" className="border p-2 w-full" />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {isEdit ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
