import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { membersApi } from '../../api/member';
import HistoryView from './HistoryView';
import Profile from './Profile';
import SideProfile from './SideProfile';
import SocialLink from './SocialLink';

const Wrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
`;
const ColumnWrap = styled.div`
  display: flex;
  align-items: center;
  // width: 1000px;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
  margin-left: 50px;
`;
const PasswordEditButton = styled.button`
  width: 350px;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  background-color: #e8e9ec;
  border: none;
  color: #222;
  margin-bottom: 40px;
  transition: all 0.3s ease;
  border-radius: 5px;
  &:hover {
    background-color: #4fd66e;
    color: white;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

interface UserInfo {
  nickname: string;
  phoneNumber: string;
  address: string;
  email: string;
  balance: number;
  profileImage: string | null;
}

export default function MyPageComponents() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Axios Response에서 data를 추출
        const response = await membersApi.myInfo();
        //데이터 추출
        const data = response.data;
        //유저 인포에 저장
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        // setError('사용자 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleUserInfoUpdate = (updatedUserInfo: UserInfo) => {
    setUserInfo(updatedUserInfo);
  };

  const balance = userInfo?.balance ?? 0;
  const nickname = userInfo?.nickname ?? 'Anonymous';
  const profileImage =
    userInfo?.profileImage ?? 'https://via.placeholder.com/300';

  return (
    <Wrapper>
      <SideProfile
        nickname={nickname}
        profileImage={profileImage}
        balance={balance}
      />
      <ColumnWrap>
        <Profile userInfo={userInfo} onUpdate={handleUserInfoUpdate} />
        <HistoryView />
        <SocialLink />
        <PasswordEditButton>
          비밀번호 변경 요청 메일 발송하기
        </PasswordEditButton>
      </ColumnWrap>
    </Wrapper>
  );
}
