import { axiosInstance, uploadMultipartData } from './axios';

export interface SignInResponse {
  data : {
  accessToken: string;
  }
}
export interface CheckResponse {
  data : {
  success: boolean;
  message?: string;
  }
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
  checkEmail: (email: string): Promise<CheckResponse> =>
    axiosInstance.get(`/members/check-email?email=${email}`),
  checkNickname: (nickname: string): Promise<CheckResponse> =>
    axiosInstance.get(`/members/check-nickname?nickname=${nickname}`),
  signOut : () => axiosInstance.post('/members/signout'),
  
};
