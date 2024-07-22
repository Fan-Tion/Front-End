import { useState } from 'react';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';
import AuctionHistoryContent from './AuctionHistoryContent';
import Deposit from './Deposit';
import WishList from './WishList';

type Tab = 'join' | 'buy' | 'my';

const Container = styled.div`
  margin: 100px auto;
  padding: 50px 150px;
  width: 60%;
  min-height: 70vh;
  background-color: #ffffe8;
  border-radius: 15px;
  border: 2px solid #aacb73;
`;

const Title = styled.span`
  display: block;
  font-size: 24px;
  font-weight: bold;
`;

const Tab = styled(GlobalButton)<{ $isSelected: boolean }>`
  margin: 30px 10px 0 0;
  width: 100px;
  height: 40px;
  font-size: 16px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#AACB73' : '#CDE990'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transform: ${({ $isSelected }) => ($isSelected ? 'scale(1.05)' : 'none')};
  &:hover {
    background-color: #aacb73;
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
          onClick={() => handleTabClick('my')}
          $isSelected={selectedTab === 'my'}
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
