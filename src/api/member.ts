import { axiosInstance, uploadMultipartData } from './axios';

export interface SignInResponse {
  accessToken: string;
}

export const membersApi = {
  signUp: (payload: any) => uploadMultipartData('/members/signup', payload),
  signIn: (payload: any): Promise<SignInResponse> =>
    axiosInstance.post('/members/signin', payload),
  requestPasswordReset: (payload: {
    email: string;
    phoneNumber: string;
  }): Promise<string> =>
    axiosInstance.post('/members/reset-password-request', payload),
  resetPassword: (payload: any) =>
    axiosInstance.put('/members/reset-password', payload),
  myInfo: () => axiosInstance.get('/members/my-info'),
};
