import { axiosInstance } from './axios';

export const membersApi = {
  signUp: (payload: any) => axiosInstance.post('/members/signup', payload),
  signIn: (payload: any) => axiosInstance.post('/members/signin', payload),
  requestPasswordReset : (payload: any) => axiosInstance.post('/members/reset-password-request', payload),
  resetPassword: (payload: any) => axiosInstance.put('/members/reset-password', payload),
  myInfo : () => axiosInstance.get('/members/my-info'),
};
