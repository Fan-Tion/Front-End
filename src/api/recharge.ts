import { axiosInstance } from './axios';

export const rechargeApi = {
  checkout: payload => axiosInstance.post('/payments/request', payload),
  success: (url, payload, config) => axiosInstance.post(url, payload, config),
  fail: params => axiosInstance.get('/payments/fail', { params }),
};
