import { naverLoginApi } from '@api/naverLogin';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NaverLoginCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setCookie] = useCookies(['Authorization']);

  useEffect(() => {
    const handleNaverSignin = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (!code || !state) {
          throw new Error('Code or state is missing');
        }

        // 네이버 로그인 API 호출
        const response = await naverLoginApi.naverSignin(code, state);
        console.log('API 응답:', response);

        const accessToken = response.data.accessToken;
        const expires = new Date();
        expires.setTime(expires.getTime() + 7200 * 1000); // 2시간 후 만료

        setCookie('Authorization', accessToken, {
          path: '/',
          expires,
        });

        console.log('로그인 성공, 홈으로 이동');
        navigate('/');
      } catch (error) {
        console.log('네이버 로그인 실패', error);
        navigate('/signin');
      }
    };

    handleNaverSignin();
  }, [navigate, location.search, setCookie]);

  return null;
}
