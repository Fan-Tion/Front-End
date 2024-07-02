import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ErrorPage from '../page/ErrorPage';
import HomePage from '../page/HomePage';

export default function Routes() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: (
            <HomePage />
          ),
        },
      ]
    },
  ]);


  return <RouterProvider router={router} />

}
