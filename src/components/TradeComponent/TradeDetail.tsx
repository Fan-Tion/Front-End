import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';

interface Trade {
  id: number;
  name: string;
}

interface TradeDetailProps {
  trade: Trade;
  onBack: () => void;
}

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  gap: 10px;
`;

const BackButton = styled(GlobalButton)`
  position: relative;
  right: 20px;
  bottom: 90px;
  height: 30px;
  border-radius: 6px;
`;

const Button = styled(GlobalButton)`
  width: 180px;
  margin-top: 200px;
  font-size: 20px;
  border-radius: 6px;
`;

export default function TradeDetail({ trade, onBack }: TradeDetailProps) {
  return (
    <>
      <BackButton onClick={onBack}>뒤로가기</BackButton>
      <DetailWrapper>
        <DetailTitle>{trade.name}</DetailTitle>
        <DetailContent>
          <p>구매자 메일: example@gmail.com</p>
          <p>구매자 전화번호: 010-1234-5678</p>
        </DetailContent>
        <Button>물품 인계 확인</Button>
      </DetailWrapper>
    </>
  );
}
