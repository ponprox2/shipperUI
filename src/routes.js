import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import DeclinePickup from './pages/declinePickup';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import AddProduct from './pages/addProduct';
import DetailOrder from './pages/detailOrder';
import UpdProduct from './pages/updateProduct';
import Pickup from './pages/Pickup';
import StaffInfo from './pages/StaffInfo';
import ReturnBack from './pages/ReturnBack';
import ReturnConfirmation from './pages/ReturnConfirmation';
import ReturningBack from './pages/ReturningBack';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'shipperWork', element: <DashboardApp /> },
        { path: 'deliveryConfirmation', element: <User /> },
        { path: 'orders', element: <Products /> },
        { path: 'shippingOrdersDelivering', element: <Blog /> },
        { path: 'declinePickup', element: <DeclinePickup /> },
        { path: 'pickup', element: <Pickup /> },
        { path: 'declineDelevery', element: <Blog /> },
        // { path: 'login', element: <Login /> },
        { path: 'addProduct', element: <AddProduct /> },
        { path: 'register', element: <Register /> },
        { path: 'updateProduct/', element: <UpdProduct /> },
        { path: 'orderDetail/', element: <DetailOrder /> },
        { path: 'staffInfo', element: <StaffInfo/>},
        { path: 'returnBack', element: <ReturnBack/>},
        { path: 'returnConfirmation', element: <ReturnConfirmation/>},
        { path: 'returningBack', element: <ReturningBack/>},
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
