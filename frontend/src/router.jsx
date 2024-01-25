import {Navigate, createBrowserRouter} from 'react-router-dom';
import DefaulLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Income from './pages/Income';
import Transaction from './pages/Transaction';
import AllTransaction from './pages/AllTransaction';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaulLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to= '/dashboard'/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/income',
        element: <Income/>
      },
      {
        path: '/transaction',
        element: <AllTransaction/>
      },
      {
        path: '/transaction/new',
        element: <Transaction/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to='/login'/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  }
])

export default router;