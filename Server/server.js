require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());  // for frontend-backend communication
app.use(bodyParser.json());  

// API Routes
app.use('/api/auth', authRoutes);  // Authentication routes (login, register)
app.use('/api/customers', customerRoutes);  // Protected customer routes (CRUD operations)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
