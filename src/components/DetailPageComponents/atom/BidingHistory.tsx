import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0 0 0;
  padding: 10px 16px;
  background-color: lightblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

interface BidType {
  auctionId: string;
  bidPrice: number;
  bidder: string;
  createDate: string;
}

interface BidingHistoryType {
  auctionId: string
}

export default function BidingHistory({ auctionId }: BidingHistoryType) {
  const [biddingHistory, setBiddingHistory] = useState<BidType[]>([]);

  useEffect(() => {
    // SSE 설정
    const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/bid/${auctionId}`);

    // 서버에서 메시지를 수신할 때마다 실행
    eventSource.onmessage = (event) => {
      const newBid = JSON.parse(event.data);
      setBiddingHistory((prevHistory) => [...prevHistory, newBid]);
    };

    // 오류 발생 시 실행
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // 컴포넌트가 언마운트될 때 이벤트 소스 닫기
    return () => {
      eventSource.close();
    };
  }, []);

  // if (biddingHistory.length <= 0) {
  //   return null
  // }

  return (
    <Container>
      {biddingHistory.map((bid) => {
        return (
          <Row key={bid.createDate}>
            <div>
              <p>≈bidder: {bid.bidder}</p>
              <p>bid Price: {bid.bidPrice}</p>
              <p>bid CreatedAt: {bid.createDate}</p>
            </div>
          </Row>
        )
      })}
      <Row>
        <div>
          <p>bidder: test</p>
          <p>bid Price: 1000</p>
          <p>bid CreatedAt: 어제</p>
        </div>
      </Row>
    </Container>
  )
}
