import { naverLoginApi } from '@api/naverLogin';
import { Styled } from '../../styled-components/AuthStyle';

// 프로필에 넣을 계정 연동 해제 버튼
export default function UnlinkNaverAccount() {
  const handleUnlink = async () => {
    try {
      await naverLoginApi.unlinkNaverAccount();
      alert('계정 연동 해제 성공');
    } catch (error) {
      console.log('계정 연동 해제 실패', error);
      alert('계정 연동 해제 실패');
    }
  };
  return (
    <Styled.SocialButtonWrap onClick={handleUnlink}>
      <Styled.NaverImg src="/img/naver_login.png"  />
      네이버 계정 연동 해제
    </Styled.SocialButtonWrap>
  );
}