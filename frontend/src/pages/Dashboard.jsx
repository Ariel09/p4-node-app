import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect, useState } from 'react';
import { fetchData } from '../fetch/fetchData';

function Dashboard() {
  const {token} = useStateContext();
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpenses, setTotalExpenses] = useState();
  const [difference, setDifference] = useState();

  const getAllTransaction = async () =>{
    try {
      const response = await fetchData(`/transactions/`, token);
      console.log(response)
    
      setTransactions(response.data)
    } catch (error) {
      console.error('Error: ', error.message);
    }
  }

  useEffect(()=>{
    const firstMount = async () =>{
      await getAllTransaction();
    }

    firstMount();
  }, [])

  useEffect(()=>{
    const Income = transactions
    .filter(transaction => transaction.type.type === 'Income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
    const Expenses = transactions
    .filter(transaction => transaction.type.type === 'Expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

    const final = Income - Expenses;

  setTotalIncome(Income);
  setTotalExpenses(Expenses);
  setDifference(final);
  
  }, [transactions])
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        bgcolor: '#cfe8fc', 
        height: 'auto',
        }}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6">Financial Summary</Typography>
          <Typography variant="subtitle1">Total Income: Php{totalIncome}</Typography>
          <Typography variant="subtitle1">Total Expenses: Php{totalExpenses}</Typography>
          <Typography variant="subtitle1">Difference: Php{difference}</Typography>
        </Paper>
      </Box>
    </Container>

  );
}

export default Dashboard;