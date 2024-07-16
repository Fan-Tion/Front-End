import { useEffect, useState } from 'react';
import {
  Container,
  Section,
  Title,
  EditButton,
  Info,
  InfoName,
} from '../../styled-components/MyPageStyle';
import { membersApi } from '../../api/member';

interface ProfileProps {
  userInfo: any;
}

const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber || phoneNumber.length !== 11) {
    return phoneNumber;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

export default function Profile({ userInfo } : ProfileProps) {
 
  return (
    <Container>
      <Section>
        <Title>회원정보</Title>
        <EditButton>EDIT</EditButton>
      </Section>
      <Info>닉네임 : <InfoName>{userInfo?.nickname}</InfoName></Info>
      <Info>전화번호 : <InfoName>{formatPhoneNumber(userInfo?.phoneNumber)}</InfoName></Info>
      <Info>이메일 : <InfoName>{userInfo?.email}</InfoName></Info>
      <Info>배송지 주소 : <InfoName>{userInfo?.address}</InfoName></Info>
    </Container>
  );
}
