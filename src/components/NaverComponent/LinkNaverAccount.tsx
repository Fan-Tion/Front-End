import { naverLoginApi } from '@api/naverLogin';
import { Styled } from '../../styled-components/AuthStyle';

// 프로필에 넣을 연동 버튼
export default function LinkNaverAccount() {
  const handleLink = async () => {
    try {
      await naverLoginApi.linkNaverAccount();
      alert('계정 연동 성공');
    } catch (error) {
      console.log('계정 연동 실패', error);
      alert('계정 연동 실패');
    }
  };
  return (
    <Styled.SocialButtonWrap onClick={handleLink}>
      <Styled.LogoImage src="/img/naver_login.png" />
      네이버 계정 연동
    </Styled.SocialButtonWrap>
  );
}
