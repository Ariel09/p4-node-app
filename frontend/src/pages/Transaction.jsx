import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useReducer, useState } from 'react';
import { fetchData, postData } from '../fetch/fetchData';
import { useStateContext } from '../contexts/ContextProvider';
import { transactionReducer } from './onChangeReducer';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Transaction() {
  const navigate = useNavigate();
  const {token} = useStateContext();
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transaction, dispatch] = useReducer(transactionReducer, {
    amount: '',
    type: '',
    category: '',
  })
  const handleChange = (e) => {
    console.log(e.target.name)
    dispatch({
        type: e.target.name,
        payload: e.target.value
    })
  }

  const handleTypeChange = async (e) =>{
    dispatch({
        type: e.target.name,
        payload: e.target.value
    })

    await getCategory(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      const response = await postData('POST', transaction, '/transactions/new', token);

      if(response.ok){
        navigate('/dashboard');
      }
    } catch (error) {
        console.error('Error: ', error.message)
    }
  }

  const getType = async () =>{
    try {
      const response = await fetchData('/types/', token);

      setTypes(response.data)
    } catch (error) {
      console.error('Error: ', error.message)
    }
  }

  const getCategory = async (type) => {
    try {
      const  response = await fetchData(`/categories/type/${type}`, token);

      setCategories(response.data)
    } catch (error) {
        console.error('Error: ', error.message)
    }
  }

  useEffect(()=>{
    const firstMount = async () => {
        await getType();
    }

    firstMount();
  }, [])

  return (
    <Container maxWidth="md">
      <Box sx={{ 
        bgcolor: '#cfe8fc', 
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        gap: '1rem',
        }}>
        <Box sx={{
          display: 'flex',
          placeContent: 'center',
        }}>
            <Typography variant='h3'>Transaction</Typography>
        </Box>
        <Box
          component="form"
          sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField onChange={handleChange} id="amount" name='amount' label="Amount" variant="outlined" value={transaction.amount} />
          <TextField onChange={handleTypeChange} id="type" name='type' label="Type" variant="outlined" value={transaction.type} select >
            {types && types.map(type => (
              <MenuItem key={type._id} value={type._id}>{type.type}</MenuItem>
            ))}
          </TextField>
          <TextField onChange={handleChange} id="category" name='category' label="Category" variant="outlined" value={transaction.category} select >
            {categories && categories.map(category => (
              <MenuItem key={category._id} value={category._id}>{category.category}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{
          display: 'flex',
          placeContent: 'center',
        }}>
          <Button onClick={handleSubmit} size='large' variant="contained">ADD</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Transaction;