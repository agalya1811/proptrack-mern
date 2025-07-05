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
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl w-full mx-auto">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">
        {isEdit ? 'Edit Property' : 'Add Property'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded p-2"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full border rounded p-2"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full border rounded p-2"
        />
        <input
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma separated)"
          className="w-full border rounded p-2"
        />
        <input
          name="images"
          value={form.images}
          onChange={handleChange}
          placeholder="Image URLs (comma separated)"
          className="w-full border rounded p-2"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            name="bedrooms"
            type="number"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="border rounded p-2"
          />
          <input
            name="bathrooms"
            type="number"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="border rounded p-2"
          />
          <input
            name="area"
            type="number"
            value={form.area}
            onChange={handleChange}
            placeholder="Area (sq ft)"
            className="border rounded p-2"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
