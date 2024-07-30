import { axiosInstance } from './axios';
type Tab = 'join' | 'buy' | 'sell';
type Tab2 = '1months' | '3months' | '1year';
interface Params {
  page: number;
}
export const historyApi = {
  auctionHistory: (selectedTab: Tab, params: Params) =>
    axiosInstance.get(`/auction/${selectedTab}-auction-list`, { params }),
  depositHistory: (selectedTab: Tab2, params: Params) =>
    axiosInstance.get(`/members/my-balance/${selectedTab}`, { params }),
  likesHistory: () => axiosInstance.get('/auction/favorite-auction-list'),
  deposit: () => axiosInstance.get('/auction/my-info-deposit'),
};
