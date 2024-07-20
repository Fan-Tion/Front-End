import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';

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
`;

const Label = styled.div`
  font-size: 14px;
  color: #666;
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const HighlightedValue = styled(Value)`
  color: red;
`;

const BuyNowButton = styled(GlobalButton)`
  align-self: center;
`;

const Divider = styled.hr`
  border: 1px solid #eee;
  width: 95%;
  border-color: black;
  border-style: solid;
  border-width: 1px 0 0 0;
`
interface AuctionInfoPropType {
  title: string;
  category: string;
}

export default function AuctionInfoModule({ title, category }: AuctionInfoPropType) {

  const categoryIndex: { [key: string]: string } = {
    'photo-card': "포토 카드",
    'sign': '사인',
    'digital': '디지털'
  }

  return (
    <InfoContainer>
      <Title>{title}</Title>
      <Row>
        <Label>카테고리</Label>
        <Value>{categoryIndex[category]}</Value>
        <Label>남은 시간</Label>
        <HighlightedValue>23:07:18</HighlightedValue>
      </Row>
      <Row>
        <Label>시작 시간</Label>
        <Value>2024.07.01 20:31:05</Value>
        <Label>종료 시간</Label>
        <Value>2024.07.03 20:31:05</Value>
      </Row>
      <Divider />
      <Row>
        <Label>시작 가격</Label>
        <Value>15,000 원</Value>
        <Label>현재 입찰 가격</Label>
        <Value>30,000 원</Value>
      </Row>
      <Row>
        <Label>즉시구매가</Label>
        <Value>50,000 원</Value>
      </Row>
      <BuyNowButton>즉시 구매</BuyNowButton>
    </InfoContainer>
  )
}
