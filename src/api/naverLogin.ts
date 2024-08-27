import { axiosInstance } from './axios';

export const naverLoginApi = {
  // 네이버 로그인
  naverSignin: (code: string, state: string) =>
    axiosInstance.get('/members/naver/signin', {
      params: { code, state },
    }),
  // 네이버 로그인연동
  linkNaverAccount: ({
    linkEmail,
    uuid,
  }: {
    linkEmail: string;
    uuid: string;
  }) =>
    axiosInstance.put('/members/naver/link', null, {
      params: { linkEmail, uuid },
    }),
  // 네이버 로그인 연동 해제
  unlinkNaverAccount: () => axiosInstance.put('/members/naver/unlink'),
  //네이버 이메일로 연동메세지 전송
  linkNaverEmailAccount: (queryString: string) =>
    axiosInstance.post(`/members/naver/link${queryString}`),
};
