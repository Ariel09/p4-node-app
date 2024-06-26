import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { fetchData} from '../fetch/fetchData';


function AllTransaction() {
  const {token} = useStateContext();
  const [types, setTypes] = useState([]);
  const [sortType, setSortType] = useState('');
  const [transactions, setTransactions] = useState();
  
  const getAllTransaction = async () =>{
    try {
      const response = await fetchData('GET', `/transactions/${sortType}`, token);
      const responseData = await response.json();

      if(response.ok){
        setTransactions(responseData.data)
      }
      
    } catch (error) {
      console.error('Error: ', error.message);
    }
  }

  const getType = async () =>{
    try {
      const response = await fetchData('GET', '/types/', token);

      setTypes(response.data)
    } catch (error) {
      console.error('Error: ', error.message)
    }
  }
  
  const handleClick = async (id) =>{
    try {
      const response = await fetchData('DELETE', `/transactions/${id}`, token);
      console.log(response)
      if(response.ok){
        await getAllTransaction()
      }
    } catch (error) {
      console.error('Error: ', error.message) 
    }
  }

  useEffect(()=>{
    console.log(sortType)
    const firstMount = async() =>{
      await getAllTransaction();
      await getType();
    };
    firstMount()
  }, [sortType])




  return ( 
    <Container maxWidth="lg">
      <Box sx={{ 
        bgcolor: '#cfe8fc', 
        height: 'auto',
        }}>
        <TableContainer component={Paper}>
          <Box sx={{
            display: 'flex',
            placeItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem'
          }}>
            <Link to='/transaction/new'><Button variant='contained' color='success'>Add New</Button></Link>    
            <TextField sx={{width: '7rem'}} id="standard-basic" label="Sort" variant="standard" value={sortType} onChange={(e) => setSortType(e.target.value)}  select>
              <MenuItem value=''>None</MenuItem>
              {types && types.map(type => (
                <MenuItem key={type._id} value={type._id}>{type.type}</MenuItem>
              ))}
            </TextField>   
          </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
              <TableCell align="right">TYPE</TableCell>
              <TableCell align="right">CATEGORY</TableCell>
              <TableCell align="right">CREATED AT</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions && transactions.map(transaction =>(
              <TableRow key={transaction._id}>
                <TableCell component="th" scope="row">
                  {transaction._id}
                </TableCell>
                <TableCell align="right">{transaction.amount}</TableCell>
                <TableCell align="right">{transaction.type.type}</TableCell>
                <TableCell align="right">{transaction.category.category}</TableCell>
                <TableCell align="right">{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Link to={'/transaction/' + transaction._id}><Button  variant='contained' color='info' size='small'>Edit</Button></Link>
                  <Button variant='contained' color='error' size='small'  onClick={()=>handleClick(transaction._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default AllTransaction;