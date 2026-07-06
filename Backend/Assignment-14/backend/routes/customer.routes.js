const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.model'); 

// 1. ADD NEW CUSTOMER API (Create - C)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    const newCustomer = new Customer({ name, email, phone, status });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 2. GET ALL CUSTOMERS API (Read - R)
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 3. UPDATE CUSTOMER API (Update - U) <-- புதிய பகுதி
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true } // அப்டேட் செய்யப்பட்ட புதிய டேட்டாவை ரிட்டன் செய்ய
    );
    if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 4. DELETE CUSTOMER API 
router.delete('/:id', async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;