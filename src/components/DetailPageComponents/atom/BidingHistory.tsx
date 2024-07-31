import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0 0 0;
  padding: 10px 16px;
  background-color: lightblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

  const startEventSource = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/bid/${auctionId}`);

    eventSource.addEventListener('addBid', (e: MessageEvent) => {
      const receivedConnectData: BidType = JSON.parse(e.data);
      console.log('connect event data: ', receivedConnectData); // "connected!"

      setBiddingHistory((prevHistory) => [...prevHistory, receivedConnectData]);
    });

    eventSource.onerror = (error) => {
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
      {biddingHistory.map((bid) => (
        <Row key={bid.createDate}>
          <div>
            <p>bidder: {bid.bidder}</p>
            <p>bid Price: {bid.bidPrice}</p>
            <p>bid CreatedAt: {bid.createDate}</p>
          </div>
        </Row>
      ))}
    </Container>
  );
}
