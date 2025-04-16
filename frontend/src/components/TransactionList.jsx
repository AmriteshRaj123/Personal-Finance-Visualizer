import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

const TransactionList = ({ transactions, onDeleteTransaction, onEditTransaction }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{format(new Date(transaction.date), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell align="right">${transaction.amount.toFixed(2)}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onEditTransaction(transaction)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteTransaction(transaction._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;