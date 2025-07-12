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
import Error_404 from './Pages/Error/Error_404/Error_404';
import Error_500 from './Pages/Error/Error_500/Error_500';

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    errorElement: <Error_500 />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/about",
        element: <About />,
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
  return (
    <RouterProvider router={router} />
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
