import React from 'react';
import {
  Container,
  Section,
  Title,
  EditButton,
  Info,
} from '../../styled-components/MyPageStyle';

export default function Profile() {
  return (
    <Container>
      <Section>
        <Title>회원정보</Title>
        <EditButton>EDIT</EditButton>
      </Section>
      <Info>이름</Info>
      <Info>전화번호</Info>
      <Info>이메일</Info>
      <Info>배송지 주소</Info>
    </Container>
  );
}
