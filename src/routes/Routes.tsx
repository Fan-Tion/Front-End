import LoadingScreen from '@components/LoadingScreen';
import NaverLoginCallback from '@components/NaverComponent/NaverLoginCallback';
import ProtectedRoute from '@components/ProtectedRoute';
import RootLayout from '@layout/RootLayout';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AuctionCreatePage,
  AuctionHistoryPage,
  AuctionModifyPage,
  ChannelCreatePage,
  CommunityListPage,
  CommunityPage,
  CommunityPostPage,
  DepositHistoryPage,
  DetailPage,
  EditorAuctionPage,
  ErrorPage,
  FailPage,
  FindPasswordPage,
  HomePage,
  MainBoardPage,
  ModifyPostPage,
  MyPage,
  NaverLinkPage,
  PasswordResetPage,
  PopularCategoryPage,
  PostDetailPage,
  SearchItemPage,
  SignInPage,
  SignUpPage,
  SuccessPage,
} from '../pages';

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
          element: <HomePage />,
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
          path: 'signup',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <SignUpPage />
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
              <ProtectedRoute>
                <AuctionCreatePage />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: 'auction/modify/:auctionId',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <AuctionModifyPage />
              </ProtectedRoute>
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
        {
          path: 'search',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <SearchItemPage />
            </Suspense>
          ),
        },
        {
          path: 'community',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <CommunityPage />
            </Suspense>
          ),
        },
        {
          path: 'community/all',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <CommunityListPage />
            </Suspense>
          ),
        },
        {
          path: 'community/:channelId',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <MainBoardPage />
            </Suspense>
          ),
        },
        {
          path: 'community/channel/create',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <ChannelCreatePage />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: 'community/:channelId/new',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ProtectedRoute>
                <CommunityPostPage />
              </ProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: 'community/:channelId/:postId',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <PostDetailPage />
            </Suspense>
          ),
        },
        {
          path: 'community/:channelId/:postId/modify',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ModifyPostPage />
            </Suspense>
          ),
        }
      ],
    },
    {
      path: 'reset-password-page',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <PasswordResetPage />
        </Suspense>
      ),
    },
    {
      path: 'members/naver/signin',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <NaverLoginCallback />
        </Suspense>
      ),
    },
    {
      path: 'naverLink',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <NaverLinkPage />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
