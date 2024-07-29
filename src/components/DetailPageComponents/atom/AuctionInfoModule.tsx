import { categoryKrMap } from '@constants/category';
import { calculateTimeLeft, formatDateTime, formatTimeLeft } from '@utils/TimeUtils';
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GlobalButton } from '../../../styled-components/Globalstyle';

// styles 
const InfoContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  align-items: center;
`;

const Label = styled.div`
  font-size: 14px;
  color: #666;
  width: 80px;
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-family: monospace; /* 고정폭 글꼴로 변경 */
  width: 220px; /* 고정된 폭 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const HighlightedValue = styled(Value)`
  color: red;
`;

const BuyNowButton = styled(GlobalButton)`
  width: 200px;
  align-self: center;
  border-radius: 10px;
  font-size: 20px;
`;

const BidButton = styled(GlobalButton)`
  width: 100%;
  background-color: #FFD4D4;
  border-radius: 10px;
  font-size: 20px;
  &:hover {
    background-color: #FFB3B3;
  }
  &:active {
    background-color: #FFA1A1;
  }
`

const Divider = styled.hr`
  border: 1px solid #eee;
  width: 95%;
  border-color: black;
  border-style: solid;
  border-width: 1px 0 0 0;
`

// initialize
interface AuctionInfoPropType {
  details: {
    title: string;
    category: string;
    endDate: string;
    createDate: string;
    currentBidPrice: number;
    buyNowPrice: number;
    status: boolean;
  }
  buyNow: () => void;
  bidHandler: () => void;
  isLoggedIn: boolean;
}

export default function AuctionInfoModule({ isLoggedIn, details, buyNow, bidHandler }: AuctionInfoPropType) {
  const { title, category, endDate, createDate, currentBidPrice, buyNowPrice } = details;
  const timeLeftRef = useRef<HTMLDivElement>(null);
  const auctionState = details.status;

  const updateTimeLeft = useCallback(() => {
    const newTimeLeft = calculateTimeLeft(endDate);
    if (timeLeftRef.current) {
      timeLeftRef.current.textContent = auctionState ? formatTimeLeft(newTimeLeft) : '경매 종료됨';
    }
  }, [endDate, auctionState]);

  useEffect(() => {
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [updateTimeLeft]);

  return (
    <InfoContainer>
      <Title>{title}</Title>
      <Row>
        <Label>카테고리</Label>
        <Value>{categoryKrMap[category]}</Value>
        <Label>시작 시간</Label>
        <Value>{formatDateTime(createDate)}</Value>
      </Row>
      <Row>
        <Label>종료 시간</Label>
        <Value>{formatDateTime(endDate)}</Value>
        <Label>남은 시간</Label>
        <HighlightedValue ref={timeLeftRef}>
          {auctionState ? formatTimeLeft(calculateTimeLeft(endDate)) : '경매 종료됨'}
        </HighlightedValue>
      </Row>
      <Divider />
      <Row>
        {auctionState ? <Label>현재 가격</Label> : <Label>낙찰 가격</Label>}
        <Value>{currentBidPrice.toLocaleString()} 원</Value>
        <Label>즉시 구매</Label>
        <Value>{buyNowPrice.toLocaleString()} 원</Value>
        {isLoggedIn && auctionState && <BuyNowButton type='button' onClick={buyNow}>즉시 구매하기</BuyNowButton>}
      </Row>
      {isLoggedIn && auctionState && <BidButton type='button' onClick={bidHandler}>입찰하기</BidButton>}
    </InfoContainer>
  )
}
