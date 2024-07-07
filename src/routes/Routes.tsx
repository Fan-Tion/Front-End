import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ErrorPage from '../page/ErrorPage';
import HomePage from '../page/HomePage';
import SignUpPage from '../page/SignUpPage';
import SignInPage from '../page/SignInPage';
import FindPasswordPage from '../page/FindPasswordPage';
import AuctionHistoryPage from '../page/AuctionHistoryPage';
import DepositHistoryPage from '../components/DepositHistoryPageComponents';

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: 'test',
          element: <AuctionHistoryPage />,
        },
        {
          path: 'test2',
          element: <DepositHistoryPage />,
        },
      ],
    },
    {
      path: '/members/signup',
      element: <SignUpPage />,
    },
    {
      path: '/members/signin',
      element: <SignInPage />,
    },
    {
      path: '/members/findpassword',
      element: <FindPasswordPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
