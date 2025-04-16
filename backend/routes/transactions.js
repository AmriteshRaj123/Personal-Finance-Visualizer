import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a transaction
router.post('/', async (req, res) => {
  const transaction = new Transaction({
    amount: req.body.amount,
    date: req.body.date,
    description: req.body.description
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;

      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
      await transaction.deleteOne();
      res.json({ message: 'Transaction deleted' });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;