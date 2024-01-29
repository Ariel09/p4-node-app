import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

function NavBar() {
  const {user, setUser, setToken} = useStateContext();
  console.log(user)

  const handleLogout = () =>{
    setUser('');
    setToken('');
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        bgcolor: '#cfe8fc', 
        height: '10vh',
        display: 'flex',
        placeItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <Typography variant='h4' align='center'>{`${user}'s Personal Finance Tracker`}</Typography>
        <Box sx={{
          display: 'flex',
          gap: '.5rem',
          justifyContent: 'space-evenly'
        }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Link to='/dashboard'><Button>Dashboard</Button></Link>
            <Link to='/transaction'><Button>Transaction</Button></Link>
            <Button onClick={handleLogout}>Logout</Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  );
}

export default NavBar;