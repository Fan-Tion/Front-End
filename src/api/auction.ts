import { auctionDetailsDataType } from '@mocks/db';
import { axiosInstance, uploadMultipartData } from './axios';

interface checkFavoriteResponseType {
  data: any;
}

interface buyNowPromise {
  buyNowPrice: number;
  balance: number;
}

interface bidNowPayloadType {
  auctionId: string;
  bidPrice: number;
}

interface bidNowPromise {
  data: any;
  bidPrice: number;
}

export const auctionApi = {
  create: (payload: any) => uploadMultipartData('/auction', payload),
  getDetails: (auctionId: string): Promise<auctionDetailsDataType> =>
    axiosInstance.get(`/auction/view/${auctionId}`),
  getCategory: () => axiosInstance.get('/auction/category'),
  deleteAuction: (payload: string) =>
    axiosInstance.delete(`/auction/${payload}`),
  checkFavorite: (payload: string): Promise<checkFavoriteResponseType> =>
    axiosInstance.get(`/auction/favorite/${payload}`),
  toggleFavorite: (payload: string): Promise<checkFavoriteResponseType> =>
    axiosInstance.post(`/auction/favorite/${payload}`),
  ReportAuction: (payload: string) =>
    axiosInstance.post(`/auction/report/${payload}`, {
      description: '부적절한 경매로 신고 접수',
    }),
  buyNow: (payload: string): Promise<buyNowPromise> =>
    axiosInstance.put('/bid', payload),
  bidNow: (payload: bidNowPayloadType): Promise<bidNowPromise> =>
    axiosInstance.post('/bid', payload),
  search: (params: {
    page: number;
    categoryOption?: string;
    keyword?: string;
  }) => axiosInstance.get('/auction/search', { params }),
};
