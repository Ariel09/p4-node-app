import {Navigate, createBrowserRouter} from 'react-router-dom';
import DefaulLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Income from './pages/Income';

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