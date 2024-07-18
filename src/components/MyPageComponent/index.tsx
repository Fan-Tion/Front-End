import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { membersApi } from '../../api/member';
import HistoryView from './HistoryView';
import Profile from './Profile';
import SideProfile from './SideProfile';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const ColumnWrap = styled.div`
  display: flex;
  align-items: center;
  width: 1800px;
  flex-direction: column;
  gap: 100px;
  margin-top: 40px;
`;
const PasswordEditButton = styled.button`
  width: 350px;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  background-color: #87ceeb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
  margin-bottom: 40px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #00bfff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export default function MyPageComponents() {

  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Axios Response에서 data를 추출
        const response = await membersApi.myInfo();
        //데이터 추출
        const data = response;
        //유저 인포에 저장
        setUserInfo(data);
      } catch (error) {
        setError('사용자 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <Wrapper>
      <SideProfile nickname={userInfo?.nickname} />
      <ColumnWrap>
        <Profile userInfo={userInfo} />
        <HistoryView />
        <PasswordEditButton>
          비밀번호 변경 요청 메일 발송하기
        </PasswordEditButton>
      </ColumnWrap>
    </Wrapper>
  );
}
