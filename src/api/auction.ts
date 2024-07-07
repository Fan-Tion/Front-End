import { axiosInstance } from './axios';

export const auctionApi = {
  create: (payload: any) => axiosInstance.post('/auction', payload),
};
