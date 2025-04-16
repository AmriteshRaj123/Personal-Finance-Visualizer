import { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { format } from 'date-fns';

const TransactionForm = ({ onAddTransaction, editingTransaction }) => {
  const [transaction, setTransaction] = useState({
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTransaction) {
      setTransaction({
        amount: editingTransaction.amount,
        date: format(new Date(editingTransaction.date), 'yyyy-MM-dd'),
        description: editingTransaction.description
      });
    }
  }, [editingTransaction]);

  const validateForm = () => {
    const newErrors = {};
    if (!transaction.amount) newErrors.amount = 'Amount is required';
    if (isNaN(transaction.amount)) newErrors.amount = 'Amount must be a number';
    if (!transaction.date) newErrors.date = 'Date is required';
    if (!transaction.description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onAddTransaction({
        ...transaction,
        amount: parseFloat(transaction.amount)
      });
      setTransaction({ amount: '', date: format(new Date(), 'yyyy-MM-dd'), description: '' });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={transaction.amount}
          onChange={handleChange}
          error={!!errors.amount}
          helperText={errors.amount}
          fullWidth
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={transaction.date}
          onChange={handleChange}
          error={!!errors.date}
          helperText={errors.date}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          name="description"
          value={transaction.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </Box>
    </Paper>
  );
};

export default TransactionForm;