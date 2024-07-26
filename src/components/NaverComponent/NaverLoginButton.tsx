import { naverLoginApi } from '@api/naverLogin';
import { Styled } from '../../styled-components/AuthStyle';

export default function NaverLoginButton() {
  const handleLogin = async () => {
    try {
      const response = await naverLoginApi.requestNaverLogin();
      console.log('네이버 로그인 요청응답', response);
    } catch (error) {
      console.log('네이버 로그인 요청 실패', error);
    }
  };
  return (
    <Styled.SocialButtonWrap onClick={handleLogin}>
      <Styled.NaverImg src="/img/naver_login.png" />
      네이버 로그인
    </Styled.SocialButtonWrap>
  );
}
