import { axiosInstance } from './axios';

export const TradeApi = {
  history: () => axiosInstance.get('/bid/auction'),
  receipt: (payload: any) => axiosInstance.post('/bid/auction', payload),
  delivery: (payload: any) => axiosInstance.put('/bid/auction', payload),
  cancel: (payload: any) =>
    axiosInstance.delete('/bid/auction', { data: payload }),
};
