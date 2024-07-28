import { auctionDetailsDataType } from '@mocks/db';
import { axiosInstance, uploadMultipartData } from './axios';

interface checkFavoriteResponseType {
  favoriteChk: boolean;
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
};
