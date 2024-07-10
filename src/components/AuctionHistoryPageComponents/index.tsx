import React, { useState } from 'react';
import styled from 'styled-components';
import AuctionHistoryContent from './AuctionHistoryContent';
import WishList from './WishList';
import Deposit from './Deposit';

type Tab = 'join' | 'buy' | 'my';

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
  const [selectedTab, setSelectedTab] = useState<Tab>('join');

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab);
  };
  return (
    <Container>
      <Title>경매 내역</Title>

      <Tab onClick={() => handleTabClick('join')}>입찰 내역</Tab>
      <Tab onClick={() => handleTabClick('buy')}>구매 내역</Tab>
      <Tab onClick={() => handleTabClick('my')}>판매 내역</Tab>
      <Div></Div>
      <AuctionHistoryContent selectedTab={selectedTab} />
      <Div2>
        <WishList />
        <Deposit />
      </Div2>
    </Container>
  );
}
