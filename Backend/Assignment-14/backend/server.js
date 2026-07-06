const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use('/api/auth', require('./routes/athu.rounts'));
app.use('/api/customers', require('./routes/customer.routes'));


app.get('/', (req, res) => {
  res.send('CRM Backend Server is Running successfully!');
});

// Database Connectivity (MongoDB Setup)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });