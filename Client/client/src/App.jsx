import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/property/:id" element={<h1>Property Detail</h1>} />
        <Route path="/dashboard" element={<h1>Agent Dashboard</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
