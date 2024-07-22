import { useState } from 'react';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';
import TradeDetail from './TradeDetail';
interface Trade {
  id: number;
  name: string;
}
const Content = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 15px;
  background-color: white;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid #cde990;
`;
const Trading = styled.h2`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;
const TradeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  scrollbar-color: #cde990 transparent;
`;
const Trade = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c4c4c4;
`;

const Title = styled.li`
  margin: 20px;
  text-align: left; // 왼쪽 정렬
`;
const Button = styled(GlobalButton)`
  margin: 15px;
  height: 30px;
  border-radius: 6px;
`;
export default function TradeHistory() {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const trades = [
    { id: 1, name: '낙찰 후 판매중인 물품 1' },
    { id: 2, name: '낙찰 후 구매중인 물품 2' },
    { id: 3, name: '낙찰 후 판매중인 물품 3' },
    { id: 4, name: '낙찰 후 판매중인 물품 4' },
    { id: 5, name: '낙찰 후 구매중인 물품 5' },
    { id: 6, name: '낙찰 후 구매중인 물품 6' },
    { id: 7, name: '낙찰 후 구매중인 물품 7' },
    { id: 8, name: '낙찰 후 구매중인 물품 8' },
    { id: 9, name: '낙찰 후 판매중인 물품 9' },
    { id: 10, name: '낙찰 후 판매중인 물품 10' },
    { id: 11, name: '낙찰 후 판매중인 물품 11' },
  ];
  const handleViewDetail = (trade: Trade) => {
    setSelectedTrade(trade);
  };

  const handleBack = () => {
    setSelectedTrade(null);
  };
  return (
    <>
      <Trading>거래중</Trading>
      <Content>
        {selectedTrade ? (
          <TradeDetail trade={selectedTrade} onBack={handleBack} />
        ) : (
          <TradeList>
            {trades.map(trade => (
              <Trade key={trade.id}>
                <Title>{trade.name}</Title>
                <Button onClick={() => handleViewDetail(trade)}>
                  상세보기
                </Button>
              </Trade>
            ))}
          </TradeList>
        )}
      </Content>
    </>
  );
}
