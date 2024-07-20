import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DepositHistoryPage from '../components/DepositHistoryPageComponents';
import { FailPage } from '../components/DepositRechargeComponent/Fail';
import { SuccessPage } from '../components/DepositRechargeComponent/Success';
import RootLayout from '../layout/RootLayout';
import {
  AuctionCreatePage,
  AuctionHistoryPage,
  DetailPage,
  ErrorPage,
  FindPasswordPage,
  HomePage,
  MyPage,
  PasswordResetPage,
  SignInPage,
  SignUpPage,
} from '../pages';

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'not-found',
          element: <ErrorPage />,
        },
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
          path: 'auction/create',
          element: <AuctionCreatePage />,
        },
        {
          path: 'auction/:auctionId',
          element: <DetailPage />,
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
