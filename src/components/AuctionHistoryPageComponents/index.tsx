import { useState } from 'react';
import styled from 'styled-components';
import { AllButton } from '../../styled-components/HomePageStyle';
import AuctionHistoryContent from './AuctionHistoryContent';
import Deposit from './Deposit';
import WishList from './WishList';

type Tab = 'join' | 'buy' | 'sell';

const Container = styled.div`
  margin: 100px auto;
  // padding: 50px 150px;
  width: 1200px;
  min-height: 70vh;
  background-color: #fff;
  border-radius: 15px;
  // border: 2px solid #aacb73;
`;

const Title = styled.span`
  display: block;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #222;
`;

const Tab = styled(AllButton)<{ $isSelected: boolean }>`
  margin: 20px 10px 0 0;
  width: 90px;
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  color: #222;
  background-color: #fff;
  border: ${({ $isSelected }) => ($isSelected ? '2px solid #4fd66e' : 'none')};
  border-radius: 6px;
  cursor: pointer;
  transform: ${({ $isSelected }) => ($isSelected ? 'scale(1.05)' : 'none')};
  &:hover {
    background-color: #4fd66e;
    transform: scale(1.05);
  }
  &:first-child {
    margin-left: 5px;
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
      <div>
        <Tab
          onClick={() => handleTabClick('join')}
          $isSelected={selectedTab === 'join'}
        >
          입찰 내역
        </Tab>
        <Tab
          onClick={() => handleTabClick('buy')}
          $isSelected={selectedTab === 'buy'}
        >
          구매 내역
        </Tab>
        <Tab
          onClick={() => handleTabClick('sell')}
          $isSelected={selectedTab === 'sell'}
        >
          판매 내역
        </Tab>
      </div>
      <Div></Div>
      <AuctionHistoryContent selectedTab={selectedTab} />
      <Div2>
        <WishList />
        <Deposit />
      </Div2>
    </Container>
  );
}
