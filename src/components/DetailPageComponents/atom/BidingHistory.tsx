import { EventSourcePolyfill } from 'event-source-polyfill';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0 0 0;
  padding: 10px 16px;
  border: 2px solid #e8e9ec;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 8px;
  border-bottom: 2px solid #e8e9ec;

  &:last-child {
    border-bottom: none;
  }
`;
const Bidder = styled.p`
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #333;
`;
const BidPrice = styled.p`
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #222;
`;
const BidTime = styled.p`
  font-weight: bold;
  margin: 0;
  color: #222;
`;

interface BidType {
  auctionId: string;
  bidPrice: number;
  bidder: string;
  createDate: string;
}

interface BidingHistoryType {
  auctionId: string;
}

export default function BidingHistory({ auctionId }: BidingHistoryType) {
  const [biddingHistory, setBiddingHistory] = useState<BidType[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const token = Cookies.get('Authorization');

  const startEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_API_BASE_URL}/bid/${auctionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    eventSource.addEventListener('addBid', event => {
      const data = (event as unknown as MessageEvent).data;

      try {
        // 데이터가 JSON 형식일 경우에만 파싱
        if (data.startsWith('{')) {
          const receivedConnectData: BidType = JSON.parse(data);
          console.log('connect event data: ', receivedConnectData);

          setBiddingHistory(prevHistory => [
            ...prevHistory,
            receivedConnectData,
          ]);
        } else {
          console.warn('Received non-JSON data:', data);
        }
      } catch (error) {
        console.error('JSON 파싱 오류:', error, 'Received data:', data);
      }
    });

    eventSource.onerror = error => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    eventSourceRef.current = eventSource;
  }, [auctionId]);

  const stopEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    startEventSource();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopEventSource();
      } else if (document.visibilityState === 'visible') {
        startEventSource();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopEventSource();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [auctionId, startEventSource, stopEventSource]);

  if (biddingHistory.length <= 0) {
    return null;
  }

  return (
    <Container>
      {biddingHistory.map(bid => (
        <Row key={bid.createDate}>
          <Bidder>입찰자: {bid.bidder}</Bidder>
          <BidPrice>입찰 가격: {bid.bidPrice} 원</BidPrice>
          <BidTime>입찰 시간: {bid.createDate}</BidTime>
        </Row>
      ))}
    </Container>
  );
}
