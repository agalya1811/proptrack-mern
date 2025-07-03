import React, { useState } from 'react';
import API from '../services/api';

const InquiryForm = ({ propertyId }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/clients', { ...form, property: propertyId });
    alert('Inquiry submitted!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-2">
      <h3 className="font-semibold">Send Inquiry</h3>
      <input required placeholder="Name" className="border p-2 w-full" onChange={e => setForm({ ...form, name: e.target.value })} value={form.name} />
      <input required placeholder="Email" className="border p-2 w-full" onChange={e => setForm({ ...form, email: e.target.value })} value={form.email} />
      <textarea placeholder="Message" className="border p-2 w-full" onChange={e => setForm({ ...form, message: e.target.value })} value={form.message}></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default InquiryForm;
