import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
const Content = styled.div`
  margin-top: 20px;
  height: 100%;
  background-color: white;
`;

export default function WishList() {
  return (
    <Container>
      <Title>찜 목록</Title>
      <Content></Content>
    </Container>
  );
}
