import { axiosInstance } from './axios';
type Tab = 'join' | 'buy' | 'my';
type Tab2 = '1months' | '3months' | '1year';
interface Params {
  pageNumber: number;
}
export const historyApi = {
  auctionHistory: (selectedTab: Tab, params: Params) =>
    axiosInstance.get(`/members/${selectedTab}-auction-list`, { params }),
  depositHistory: (selectedTab: Tab2, params: Params) =>
    axiosInstance.get(`/members/my-balance/${selectedTab}`, { params }),
  likesHistory: () => axiosInstance.get('/members/my-favorite-auction-list'),
  deposit: () => axiosInstance.get('/members/my-info-deposit'),
};
