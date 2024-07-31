import { axiosInstance } from './axios';

export const naverLoginApi = {
  // 네이버 로그인
  naverSignin: (code: string, state: string) =>
    axiosInstance.get('/members/naver/signin', {
      params: { code, state },
    }),
  // 네이버 로그인연동
  linkNaverAccount: () => axiosInstance.put('/members/naver/link'),
  // 네이버 로그인 연동 해제
  unlinkNaverAccount: () => axiosInstance.put('/members/naver/unlink'),
};
