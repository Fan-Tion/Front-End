import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DepositHistoryPage from '../components/DepositHistoryPageComponents';
import { FailPage } from '../components/DepositRechargeComponent/Fail';
import { SuccessPage } from '../components/DepositRechargeComponent/Success';
import RootLayout from '../layout/RootLayout';
import AuctionCreatePage from '../page/AuctionCreatePage';
import AuctionHistoryPage from '../page/AuctionHistoryPage';
import ErrorPage from '../page/ErrorPage';
import FindPasswordPage from '../page/FindPasswordPage';
import HomePage from '../page/HomePage';
import MyPage from '../page/MyPage';
import PasswordResetPage from '../page/PasswordResetPage';
import SignInPage from '../page/SignInPage';
import SignUpPage from '../page/SignUpPage';

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
          path: 'mypage/auction-history',
          element: <AuctionHistoryPage />,
        },
        {
          path: 'mypage/deposit-history',
          element: <DepositHistoryPage />,
        },
        {
          path: 'mypage',
          element: <MyPage />,
        },
        {
          path: 'create-auction',
          element: <AuctionCreatePage />,
        },
        {
          path: 'sandbox/success',
          element: <SuccessPage />,
        },
        {
          path: 'sandbox/fail',
          element: <FailPage />,
        },
      ],
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      path: 'signin',
      element: <SignInPage />,
    },
    {
      path: 'findpassword',
      element: <FindPasswordPage />,
    },
    {
      path: 'reset-password/:uId',
      element: <PasswordResetPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
