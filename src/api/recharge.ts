import { axiosInstance } from './axios';

export const rechargeApi = {
  success: (url, payload, config) => axiosInstance.post(url, payload, config),
};
