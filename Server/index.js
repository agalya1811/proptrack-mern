const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const viewingRoutes = require('./routes/viewingRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
//const clientRoutes = require('./routes/clientRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/properties', propertyRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/viewings', viewingRoutes);
app.use('/api/inquiries', inquiryRoutes);
//app.use('/api/clients', clientRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('PropTrack API is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
