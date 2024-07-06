import React from 'react';
import {
  Container,
  Section,
  Title,
  Info,
} from '../../styled-components/MyPageStyle';

export default function HistoryView() {
  return (
    <Container>
      <Section>
        <Title>내역보기</Title>
      </Section>
      <Info>예치금 입출금 내역보기</Info>
      <Info>경매 내역 보기</Info>
    </Container>
  );
}
