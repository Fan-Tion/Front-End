import NaverLoginCallback from '@components/NaverComponent/NaverLoginCallback';
import RootLayout from '@layout/RootLayout';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AuctionCreatePage,
  AuctionHistoryPage,
  DepositHistoryPage,
  DetailPage,
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
  LoadingScreenPage,
} from '../pages';

const Loader = () => <div>Loading...</div>;

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          path: 'not-found',
          element: (
            <Suspense fallback={<Loader />}>
              <ErrorPage />
            </Suspense>
          ),
        },
        {
          path: '',
          element: (
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: 'mypage/auction-history',
          element: (
            <Suspense fallback={<Loader />}>
              <AuctionHistoryPage />
            </Suspense>
          ),
        },
        {
          path: 'mypage/deposit-history',
          element: (
            <Suspense fallback={<Loader />}>
              <DepositHistoryPage />
            </Suspense>
          ),
        },
        {
          path: 'mypage',
          element: (
            <Suspense fallback={<Loader />}>
              <MyPage />
            </Suspense>
          ),
        },
        {
          path: 'auction/create',
          element: (
            <Suspense fallback={<Loader />}>
              <AuctionCreatePage />
            </Suspense>
          ),
        },
        {
          path: 'auction/:auctionId',
          element: (
            <Suspense fallback={<Loader />}>
              <DetailPage />
            </Suspense>
          ),
        },
        {
          path: 'sandbox/success',
          element: (
            <Suspense fallback={<Loader />}>
              <SuccessPage />
            </Suspense>
          ),
        },
        {
          path: 'sandbox/fail',
          element: (
            <Suspense fallback={<Loader />}>
              <FailPage />
            </Suspense>
          ),
        },
        {
          path: 'auction/search',
          element: (
            <Suspense fallback={<Loader />}>
              <PopularCategoryPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: 'signup',
      element: (
        <Suspense fallback={<Loader />}>
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: 'signin',
      element: (
        <Suspense fallback={<Loader />}>
          <SignInPage />
        </Suspense>
      ),
    },
    {
      path: 'findpassword',
      element: (
        <Suspense fallback={<Loader />}>
          <FindPasswordPage />
        </Suspense>
      ),
    },
    {
      path: 'reset-password-page',
      element: (
        <Suspense fallback={<Loader />}>
          <PasswordResetPage />
        </Suspense>
      ),
    },
    {
      path: 'members/naver/signin',
      element: (
        <Suspense fallback={<LoadingScreenPage/>}>
          <NaverLoginCallback />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
