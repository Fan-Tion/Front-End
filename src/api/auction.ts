import { auctionDetailsType } from './../mocks/db';
import { axiosInstance } from './axios';

export const auctionApi = {
  create: (payload: any) => axiosInstance.post('/auction', payload),
  getDetails: (auctionId: string): Promise<auctionDetailsType> =>
    axiosInstance.get(`/auction/view/${auctionId}`),
};
