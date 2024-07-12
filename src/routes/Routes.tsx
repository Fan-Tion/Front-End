import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ErrorPage from '../page/ErrorPage';
import HomePage from '../page/HomePage';
import SignUpPage from '../page/SignUpPage';
import SignInPage from '../page/SignInPage';
import FindPasswordPage from '../page/FindPasswordPage';
import MyPage from '../page/MyPage';
import PasswordResetPage from '../page/PasswordResetPage';
import AuctionCreatePage from '../page/AuctionCreatePage';


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
          path: '/mypage',
          element: <MyPage />,
        },
        {
          path: '/create-auction',
          element: (
            <AuctionCreatePage />
          ),
        }
      ],
    },

    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      path: '/signin',
      element: <SignInPage />,
    },
    {
      path: '/findpassword',
      element: <FindPasswordPage />,
    },
    {
      path: '/reset-password/:uId',
      element: <PasswordResetPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
