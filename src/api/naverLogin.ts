import { axiosInstance } from './axios';

export const naverLoginApi = {
  // 네이버 로그인 요청
  requestNaverLogin: () => axiosInstance.get('/members/naver/request'),
  // 네이버 로그인
  naverSignin: () => axiosInstance.get('/members/naver/signin'),
  // 네이버 로그인연동
  linkNaverAccount: () => axiosInstance.post('/members/naver/link'),
  // 네이버 로그인 연동 해제
  unlinkNaverAccount: () => axiosInstance.post('/members/naver/unlink'),
};
