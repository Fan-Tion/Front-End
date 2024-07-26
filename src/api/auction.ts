import { auctionDetailsDataType } from '@mocks/db';
import { axiosInstance, uploadMultipartData } from './axios';

export const auctionApi = {
  create: (payload: any) => uploadMultipartData('/auction', payload),
  getDetails: (auctionId: string): Promise<auctionDetailsDataType> =>
    axiosInstance.get(`/auction/view/${auctionId}`),
  getCategory: () => axiosInstance.get('/auction/category'),
};
