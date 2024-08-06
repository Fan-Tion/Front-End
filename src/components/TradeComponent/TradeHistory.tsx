import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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

  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid #e8e9ec;
`;

const Trading = styled.h2`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const TradeList = styled.ul`
  list-style: none;
  margin: 0;
  overflow-y: auto;
  scrollbar-color: #e8e9ec transparent;
`;
const waveAnimation = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
`;

const TradeType = styled.button`
  margin: 15px 10px 5px 0;
  height: 30px;
  color: black;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  // border: 2px solid ${props => (props.disabled ? '#4fd66e' : 'transparent')};
  border: 2px solid transparent;
  background-color: white;
  transform: ${props => (props.disabled ? 'scale(1.05)' : 'none')};
  &:hover {
    background-color: #4fd66e;
    transform: scale(1.05);
    color: #eee;
  }
  &:last-of-type {
    margin-right: 300px;
  }
  &::after {
    content: '';
    position: absolute;
    left: 6px;
    bottom: -1px;
    width: 80%;
    height: 2px;
    background: linear-gradient(
      90deg,
      #4fd66e 25%,
      transparent 25%,
      transparent 50%,
      #4fd66e 50%,
      #4fd66e 75%,
      transparent 75%,
      transparent
    );
    background-size: 200% 100%;
    animation: ${waveAnimation} 1s linear infinite;
  }
`;
const Trade = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  border-bottom: 1px solid #e8e9ec;
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
  background-color: #e8e9ec;
  &:hover {
    background-color: #4fd66e;
  }
`;

export default function TradeHistory() {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [buyData, setBuyData] = useState<any[]>([]);
  const [sellData, setSellData] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingBuyData, setViewingBuyData] = useState(true);

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
  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetail = (trade: Trade) => {
    setSelectedTrade(trade);
  };

  const handleBack = () => {
    setSelectedTrade(null);
    fetchData();
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
      <TradeType
        onClick={() => handleToggleData(true)}
        disabled={viewingBuyData}
      >
        구매중
      </TradeType>
      <TradeType
        onClick={() => handleToggleData(false)}
        disabled={!viewingBuyData}
      >
        판매중
      </TradeType>
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
