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
  cursor: pointer;
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
  auth : boolean;
  linkedEmail: string | null;
}

export default function MyPageComponents() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await membersApi.myInfo();
        const data = response.data;
        setUserInfo(data);
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  const handleUserInfoUpdate = (updatedUserInfo: UserInfo) => {
    setUserInfo(updatedUserInfo);
  };

  const handlePasswordResetRequest = async () => {
    if (userInfo) {
      try {
        await membersApi.requestPasswordReset({
          email: userInfo.email,
          phoneNumber: userInfo.phoneNumber,
        });
        alert('비밀번호 변경 요청 메일이 발송되었습니다.');
      } catch (error) {
        console.error('비밀번호 요청 실패', error);
      }
    }
  };

  const balance = userInfo?.balance ?? 0;
  const nickname = userInfo?.nickname ?? 'Anonymous';
  const profileImage =
  userInfo?.profileImage ?? 'https://via.placeholder.com/300';
  const auth = userInfo?.auth ?? false;
  const linkedEmail = userInfo?.linkedEmail ?? undefined; 
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
        <SocialLink linkedEmail ={linkedEmail} auth= {auth}/>
        <PasswordEditButton onClick={handlePasswordResetRequest}>
          비밀번호 변경 요청 메일 발송하기
        </PasswordEditButton>
      </ColumnWrap>
    </Wrapper>
  );
}
