import { axiosInstance } from './axios';

export const rechargeApi = {
  checkout: (payload: any) => axiosInstance.post('/payments/request', payload),
  success: (params: any) =>
    axiosInstance.post('/payments/success', null, { params }),
  fail: (params: any) => axiosInstance.get('/payments/fail', params),
  cancel: (payload: any) => axiosInstance.post('/payments/cancel', payload),
};
