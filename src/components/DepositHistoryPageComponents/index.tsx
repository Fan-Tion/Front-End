import React, { useState } from 'react';
import styled from 'styled-components';
import DepositHistoryContent from './DepositHistoryContent';

type Tab = '1months' | '3months' | '1year';

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

const Div = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: flex-end;
`;

const Tab = styled.p`
  margin-top: 50px;
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
    font-weight: bold;
  }
`;

export default function DepositHistoryComponents() {
  const [selectedTab, setSelectedTab] = useState<Tab>('1months');

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <Title>예치금 입·출금 내역</Title>
      <Div>
        <Tab onClick={() => handleTabClick('1months')}>최근 1개월</Tab>
        <Tab onClick={() => handleTabClick('3months')}>최근 3개월</Tab>
        <Tab onClick={() => handleTabClick('1year')}>최근 1년</Tab>
      </Div>

      <DepositHistoryContent selectedTab={selectedTab} />
    </Container>
  );
}
