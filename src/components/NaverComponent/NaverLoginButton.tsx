import { Styled } from '../../styled-components/AuthStyle';

export default function NaverLoginButton() {
  const handleLogin = () => {
    const loginRequestUrl = 'https://www.fantion.kro.kr/members/naver/request';
    window.location.href = loginRequestUrl;
  };
  return (
    <Styled.SocialButtonWrap onClick={handleLogin}>
      <Styled.NaverImg src='/img/naver_login.png'/>
      네이버 로그인
    </Styled.SocialButtonWrap>
  );
}
