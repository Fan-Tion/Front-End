import { naverLoginApi } from '@api/naverLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NaverLoginCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNaverSignin = async () => {
      try {
        await naverLoginApi.naverSignin();
        navigate('/');
      } catch (error) {
        console.log('네이버 로그인 실패', error);
        navigate('/signin');
      }
    };
    handleNaverSignin();
  }, [navigate]);
  return <div>로그인 중...</div>;
}
