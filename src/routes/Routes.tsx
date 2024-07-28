import LoadingScreen from '@components/LoadingScreen';
import RootLayout from '@layout/RootLayout';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AuctionCreatePage,
  AuctionHistoryPage,
  DepositHistoryPage,
  DetailPage,
  EditorAuctionPage,
  ErrorPage,
  FailPage,
  FindPasswordPage,
  HomePage,
  MyPage,
  PasswordResetPage,
  PopularCategoryPage,
  SignInPage,
  SignUpPage,
  SuccessPage,
} from '../pages';

// const Loader = () => <div>Loading...</div>;

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<LoadingScreen />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          path: 'not-found',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ErrorPage />
            </Suspense>
          ),
        },
        {
          path: '',
          element: (
            <HomePage />
          ),
        },
        {
          path: 'mypage/auction-history',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <AuctionHistoryPage />
            </Suspense>
          ),
        },
        {
          path: 'mypage/deposit-history',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <DepositHistoryPage />
            </Suspense>
          ),
        },
        {
          path: 'mypage',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <MyPage />
            </Suspense>
          ),
        },
        {
          path: 'auction/create',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <AuctionCreatePage />
            </Suspense>
          ),
        },
        {
          path: 'auction/:auctionId',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <DetailPage />
            </Suspense>
          ),
        },
        {
          path: 'auction/editor/:auctionId',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <EditorAuctionPage />
            </Suspense>
          ),
        },
        {
          path: 'sandbox/success',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <SuccessPage />
            </Suspense>
          ),
        },
        {
          path: 'sandbox/fail',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <FailPage />
            </Suspense>
          ),
        },
        {
          path: 'auction/search',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <PopularCategoryPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: 'signup',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: 'signin',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <SignInPage />
        </Suspense>
      ),
    },
    {
      path: 'findpassword',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <FindPasswordPage />
        </Suspense>
      ),
    },
    {
      path: 'reset-password/:uId',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <PasswordResetPage />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
