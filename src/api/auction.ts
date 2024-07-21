import { auctionDetailsType } from '@mocks/db';
import { axiosInstance, uploadMultipartData } from './axios';

export const auctionApi = {
  create: (payload: any) => uploadMultipartData('/auction', payload),
  getDetails: (auctionId: string): Promise<auctionDetailsType> =>
    axiosInstance.get(`/auction/view/${auctionId}`),
};
