import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useReducer, useState } from 'react';
import { fetchData, postData } from '../fetch/fetchData';
import { useStateContext } from '../contexts/ContextProvider';
import { transactionReducer } from './onChangeReducer';
import { Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';


function Transaction() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {token} = useStateContext();
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transaction, dispatch] = useReducer(transactionReducer, {
    amount: '',
    type: '',
    category: '',
  });

  if(id){
    useEffect(() => {
      const getTransaction = async () => {
        try {
          const response = await fetchData('GET', `/transactions/view/${id}`, token);
          const responseData = await response.json();
          const {amount, type, category} = responseData.data;
          const payload = {amount, type, category}
          await getCategory(type);
          dispatch({
            type: 'view',
            payload: payload
          })
  
        } catch (error) {
          console.error('Error: ', error.message);
        }
      }
      getTransaction();
    }, [])
  }

  const handleChange = (e) => {

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
      let method;
      let url;
      if(id){
       method = 'PATCH';
       url = `/transactions/view/${id}`; 
      }else{
       method = 'POST';
       url = '/transactions/new';
      }

      const response = await postData(method, url, token, transaction);
      const responseData = await response.json();
      console.log(responseData);
      if(response.ok){
        navigate('/dashboard');
      }
    } catch (error) {
        console.error('Error: ', error.message)
    }
  }

  const getType = async () =>{
    try {
      const response = await fetchData('GET', '/types/', token);
      const responseData = await response.json();
      if(response.ok){
        setTypes(responseData.data)
      }
    } catch (error) {
      console.error('Error: ', error.message)
    }
  }

  const getCategory = async (type) => {
    try {
      const  response = await fetchData('GET', `/categories/type/${type}`, token);
      const responseData = await response.json();
      if(response.ok){
        setCategories(responseData.data)
      }
      
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
        height: 'auto',
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
          <TextField onChange={handleChange} id="amount" name='amount' label="Amount" variant="outlined" value={transaction.amount} type='number' />
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
          <Button onClick={handleSubmit} size='large' variant="contained">{id ? 'SAVE' : 'ADD'}</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Transaction;