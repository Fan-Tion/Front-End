import { membersApi } from '@api/member';
import { useEffect, useState } from 'react';
import {
  Container,
  EditButton,
  EditInput,
  Info,
  InfoName,
  SaveButton,
  Section,
  Title,
} from '../../styled-components/MyPageStyle';

interface ProfileProps {
  userInfo: any;
}

const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber || phoneNumber.length !== 11) {
    return phoneNumber;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};


export default function Profile({ userInfo }: ProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nickname: userInfo?.nickname || '',
    phoneNumber: userInfo?.phoneNumber || '',
    address: userInfo?.address || '',
    profileImage: userInfo?.profileImage || null,
  });
 

  useEffect(() => {
    setFormData({
      nickname: userInfo?.nickname || '',
      phoneNumber: userInfo?.phoneNumber || '',
      address: userInfo?.address || '',
      profileImage: userInfo?.profileImage || null,
    });
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
  };

  const handleSubmit = async () => {
    try {
      const ProfileUpData = JSON.stringify({
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
      const requestBlob = new Blob([ProfileUpData], {
        type: 'application/json',
      });
      const data = {
        request: requestBlob,
        file: formData.profileImage,
      };

      await membersApi.InfoEdit(data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Section>
        <Title>회원정보</Title>
        <EditButton onClick={() => setEditMode(prev => !prev)}>
          {editMode ? '취소' : '수정'}
        </EditButton>
      </Section>
      {editMode ? (
        <>
          <Info>
            닉네임:
            <EditInput
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </Info>
          <Info>
            전화번호:
            <EditInput
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Info>
          <Info>
            배송지 주소:
            <EditInput
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Info>
          <Info>
            프로필 이미지:
            <EditInput
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
            />
          </Info>
          <SaveButton onClick={handleSubmit}>저장</SaveButton>
        </>
      ) : (
        <>
          <Info>
            닉네임 : <InfoName>{userInfo?.nickname}</InfoName>
          </Info>
          <Info>
            전화번호 :
            <InfoName>{formatPhoneNumber(userInfo?.phoneNumber)}</InfoName>
          </Info>
          <Info>
            이메일 : <InfoName>{userInfo?.email}</InfoName>
          </Info>
          <Info>
            배송지 주소 : <InfoName>{userInfo?.address}</InfoName>
          </Info>
        </>
      )}
    </Container>
  );
}
