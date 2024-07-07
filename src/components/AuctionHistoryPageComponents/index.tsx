import React from 'react';
import styled from 'styled-components';
import AuctionHistoryContent from './AuctionHistoryContent';
import WishList from './WishList';
import Deposit from './Deposit';
const Container = styled.div`
  margin: 100px auto;
  padding: 50px 150px;
  width: 60%;
  min-height: 70vh;
  background-color: #c4c4c4;
`;
const Title = styled.span`
  display: block;
  font-size: 24px;
  font-weight: bold;
`;
const Tab = styled.button`
  margin: 30px 10px 0 0;
  width: 100px;
  height: 40px;
  font-size: 16px;

  background-color: gray;
  color: #fff;
  border: none;
  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background-color: #495057;
    transform: scale(1.05);
  }
`;
const Tab2 = styled.p`
  width: 90px;
  height: 20px;
  font-size: 16px;
  border-right: 1px solid #000;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  &:nth-child(3) {
    border-right: none;
  }
  &:hover {
  }
`;
const Div = styled.div`
  display: flex;

  justify-content: flex-end;
`;
const Div2 = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`;
export default function AuctionHistoryComponents() {
  return (
    <Container>
      <Title>경매 내역</Title>

      <Tab>입찰 내역</Tab>
      <Tab>구매 내역</Tab>
      <Tab>판매 내역</Tab>
      <Div>
        <Tab2>최근 1개월</Tab2>
        <Tab2>최근 3개월</Tab2>
        <Tab2>최근 1년</Tab2>
      </Div>
      <AuctionHistoryContent />
      <Div2>
        <WishList />
        <Deposit />
      </Div2>
    </Container>
  );
}
