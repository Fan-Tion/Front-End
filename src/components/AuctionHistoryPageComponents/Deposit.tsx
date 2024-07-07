import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 200px;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
const Content = styled.div`
  margin-top: 20px;
`;
const Price = styled.div`
  background-color: white;
  text-align: right;
  line-height: 30px;
  width: 200px;
  height: 30px;
  font-size: 24px;
  float: right;
`;
const Charge = styled.button`
  margin-top: 40px;
  float: right;
  clear: both;
  width: 200px;
  height: 40px;
  background-color: gray;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background-color: #495057;
    transform: scale(1.05);
  }
`;
const DepositHistory = styled.button`
  margin-top: 40px;
  float: right;
  clear: both;
  width: 200px;
  height: 40px;
  background-color: gray;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background-color: #495057;
    transform: scale(1.05);
  }
`;

export default function Deposit() {
  return (
    <Container>
      <Title>예치금</Title>
      <Content>
        <Price>30,300 원</Price>
        <Charge>충전하기</Charge>
        <DepositHistory>예치금 입출금 내역</DepositHistory>
      </Content>
    </Container>
  );
}
