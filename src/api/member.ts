import { axiosInstance, uploadMultipartData } from './axios';

export interface SignInResponse {
  data: {
    accessToken: string;
  };
}
export interface CheckResponse {
  data: {
    success: boolean;
    message?: string;
  };
}

export interface WithdrawalResponse {
  success: boolean;
}

export interface PasswordResetResponse {
    success: boolean;
    uuid: string;
}

export const membersApi = {
  signUp: (payload: any) => uploadMultipartData('/members/signup', payload),
  signIn: (payload: any): Promise<SignInResponse> =>
    axiosInstance.post('/members/signin', payload),
  requestPasswordReset: (payload: {
    email: string;
    phoneNumber: string;
  }): Promise<PasswordResetResponse> =>
    axiosInstance.post('/members/reset-password-request', payload),
  resetPassword: (payload: any) =>
    axiosInstance.put('/members/reset-password', payload),
  myInfo: () => axiosInstance.get('/members/my-info'),
  checkEmail: (email: string): Promise<CheckResponse> =>
    axiosInstance.get(`/members/check-email?email=${email}`),
  checkNickname: (nickname: string): Promise<CheckResponse> =>
    axiosInstance.get(`/members/check-nickname?nickname=${nickname}`),
  signOut: () => axiosInstance.post('/members/signout'),
  withdrawal: (): Promise<WithdrawalResponse> =>
    axiosInstance.post('/members/withdrawal'),
  InfoEdit : (payload:any) => axiosInstance.put('/members/my-info', payload),
  ProfileImageEdit: (formData: FormData) => 
    axiosInstance.put('/members/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};