import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axios';

export const rechargeApi = {
  checkout: (payload: any) => axiosInstance.post('/payments/request', payload),
  success: (url: string, payload: any, config: AxiosRequestConfig) =>
    axiosInstance.post(url, payload, config),
  fail: (params: any) => axiosInstance.get('/payments/fail', { params }),
};
