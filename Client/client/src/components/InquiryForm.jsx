import React, { useState } from 'react';
import axios from 'axios';

const InquiryForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [property, setProperty] = useState(''); // Optional: you can prefill or pass it as props

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inquiryData = { name, email, phone, message, property };
      const response = await axios.post('http://localhost:5000/api/inquiries', inquiryData);
      alert('Inquiry submitted!');
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setProperty('');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md max-w-md bg-white">
      <h3 className="text-lg font-semibold">Submit Inquiry</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Your Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded"
        rows="4"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default InquiryForm;
