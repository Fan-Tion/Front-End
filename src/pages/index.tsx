import { lazy } from 'react';

export { default as HomePage } from './HomePage';
export const AuctionCreatePage = lazy(() => import('./AuctionCreatePage'));
export const AuctionHistoryPage = lazy(() => import('./AuctionHistoryPage'));
export const DepositHistoryPage = lazy(() => import('./DepositHistoryPage'));
export const DetailPage = lazy(() => import('./DetailPage'));
export const ErrorPage = lazy(() => import('./ErrorPage'));
export const FindPasswordPage = lazy(() => import('./FindPasswordPage'));
export const MyPage = lazy(() => import('./MyPage'));
export const PasswordResetPage = lazy(() => import('./PasswordResetPage'));
export const SignInPage = lazy(() => import('./SignInPage'));
export const SignUpPage = lazy(() => import('./SignUpPage'));
export const PopularCategoryPage = lazy(() => import('./PopularCategoryPage'));
export const SuccessPage = lazy(() => import('./SuccessPage'));
export const FailPage = lazy(() => import('./FailPage'));

