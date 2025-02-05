require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);


const express = require('express');
const app = express();
const port = process.env.PORT;

// Middleware to parse JSON requests
app.use(express.json());

// Auth routes for registration and login
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// A basic test route
app.get('/', (req, res) => {
  res.send('Hello, iknowbase!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Admin route
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
