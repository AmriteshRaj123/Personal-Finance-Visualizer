import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MonthlyChart from './components/MonthlyChart';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    try {
      if (editingTransaction) {
        await axios.put(`${API_URL}/transactions/${editingTransaction._id}`, newTransaction);
      } else {
        await axios.post(`${API_URL}/transactions`, newTransaction);
      }
      fetchTransactions();
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Personal Finance Tracker
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <TransactionForm 
          onAddTransaction={handleAddTransaction}
          editingTransaction={editingTransaction}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Transactions
        </Typography>
        <TransactionList 
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleEditTransaction}
        />
      </Box>

      <Box>
        <MonthlyChart transactions={transactions} />
      </Box>
    </Container>
  );
}

export default App;