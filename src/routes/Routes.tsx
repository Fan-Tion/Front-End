import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ErrorPage from '../page/ErrorPage';
import HomePage from '../page/HomePage';
import SignUpPage from '../page/SignUpPage';
import SignInPage from '../page/SignInPage';
import FindPasswordPage from '../page/FindPasswordPage';
import MyPage from '../page/MyPage';
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
          element: (
            <HomePage />
          ),
        },
        {
          path: '/mypage',
          element: (
            <MyPage />
          ),
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
      element: (
        <SignUpPage />
      ),
    },
    {
      path: '/login',
      element: (
        <SignInPage />
      ),
    },
    {
      path: '/findpassword',
      element: (
        <FindPasswordPage />
      ),
    },
  ]);


  return <RouterProvider router={router} />

}
