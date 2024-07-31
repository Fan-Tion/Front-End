import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TradeApi } from '../../api/trade';
import { AllButton } from '../../styled-components/HomePageStyle';
import TradeDetail from './TradeDetail';
interface Member {
  memberId: number;
  email: string;
  password: string;
  nickname: string;
  auth: boolean;
  isKakao: boolean;
  isNaver: boolean;
  address: string;
  phoneNumber: string;
  totalRating: number;
  ratingCnt: number;
  rating: number;
  status: string;
  profileImage: string | null;
  linkedEmail: string | null;
  createDate: string;
  withdrawalDate: string | null;
}
interface Trade {
  auctionId: number;
  title: string;
  member: Member; // 추가된 member 속성
  category: string | null;
  auctionType: boolean;
  auctionImage: string | null;
  description: string;
  currentBidPrice: number;
  currentBidder: string;
  buyNowPrice: number;
  favoriteCnt: number;
  createDate: string;
  endDate: string;
  status: boolean;
  sendChk: boolean;
  receiveChk: boolean;
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
  overflow-y: auto;
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

const Button = styled(AllButton)`
  margin: 15px;
  height: 30px;
  border-radius: 6px;
  color: ${props => (props.disabled ? '#fff' : '#222')};
  background-color: ${props => (props.disabled ? '#aacb73' : '#cde990')};
`;

export default function TradeHistory() {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [buyData, setBuyData] = useState<any[]>([]);
  const [sellData, setSellData] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingBuyData, setViewingBuyData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await TradeApi.history();
        setBuyData(response.data.buyList);
        setSellData(response.data.sellList);
        setDisplayData(response.data.buyList); // 모달을 열면 구매중 내역
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetail = (trade: Trade) => {
    setSelectedTrade(trade);
  };

  const handleBack = () => {
    setSelectedTrade(null);
  };

  const handleToggleData = (isBuy: boolean) => {
    setViewingBuyData(isBuy);
    setDisplayData(isBuy ? buyData : sellData);
    setSelectedTrade(null);
  };

  if (loading) {
    return <Content>Loading...</Content>;
  }

  return (
    <>
      <Trading>거래중</Trading>
      <Button onClick={() => handleToggleData(true)} disabled={viewingBuyData}>
        구매중
      </Button>
      <Button
        onClick={() => handleToggleData(false)}
        disabled={!viewingBuyData}
      >
        판매중
      </Button>
      <Content>
        {error ? (
          <div>데이터를 불러오는데 실패했습니다. 다시 시도해 주세요.</div>
        ) : displayData.length === 0 ? (
          <div>거래중인 내역이 없습니다.</div>
        ) : selectedTrade ? (
          <TradeDetail
            trade={selectedTrade}
            listType={viewingBuyData ? 'buyList' : 'sellList'}
            onBack={handleBack}
          />
        ) : (
          <TradeList>
            {displayData.map((data: Trade) => (
              <Trade key={data.auctionId}>
                <Title>{data.title}</Title>
                <Button onClick={() => handleViewDetail(data)}>상세보기</Button>
              </Trade>
            ))}
          </TradeList>
        )}
      </Content>
    </>
  );
}
