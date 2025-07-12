import React from 'react';

import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


//css
import './main.css';
//pages
import AppLayout from './AppLayout/AppLayout';
import Home from './Pages/App/Home/Home'
import Product from './Pages/App/Product/Product';
import About from './Pages/App/About/About';
import Login from './Pages/App/Login/Login';
import Signup from './Pages/App/Signup/Signup';
import Profile from './Pages/App/Profile/Profile';
import Requests from './Pages/App/Requests/requests';
import Error_404 from './Pages/Error/Error_404/Error_404';
import Error_500 from './Pages/Error/Error_500/Error_500';
import ForgotPassword from './Pages/App/Login/ForgotPassword';
import UpdatePassword from './Pages/App/Login/UpdatePassword';


// auth 
import usecheckAuth from './hooks/useauthcheck';
import { AuthRoute } from './auth/AuthRoute';
import { store } from './auth/authStore';
import { Provider } from 'react-redux';


const router = createBrowserRouter([
  {
    element: <AppLayout />,

    errorElement: <Error_500 />,
    children: [
      {
        path: "/",
        index: true,
        element:

<AuthRoute>

          <Home />
</AuthRoute>,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
         {
        path: "/forgot-pass",
        element: <ForgotPassword />,
      },
        {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element:
        <AuthRoute>

        <Profile />
        </AuthRoute>
        
        ,
      },
      {
        path: "/requests",
        element:
        <AuthRoute>

        <Requests />
        </AuthRoute>
        
        ,
      },
      // {
      //   path: "/projects",
      //   element: <Project />,

      //},
      // {
      //   path: "/services",
      //   element: <Services />,

      // },

      {
        path: "*",
        element: <Error_404 />,
      },
    ],
  },
]);

function App() {
  usecheckAuth();
  return (
    <RouterProvider router={router} />
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render

(
<Provider store={store}> 
  
<App />
</Provider>

);
