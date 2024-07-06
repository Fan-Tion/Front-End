import styled from 'styled-components';

const InfoContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const BuyNowButton = styled.button`
  background-color: orange;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  align-self: center;
  &:hover {
    background-color: darkorange;
  }
`;

const Divider = styled.hr`
  border: 1px solid #eee;
  width: 95%;
  border-color: black;
  border-style: solid;
  border-width: 1px 0 0 0;
`

export default function AuctionInfoModule() {
  return (
    <InfoContainer>
      <Title>상품 제목</Title>
      <Row>
        <Label>입찰 건수</Label>
        <Value>3</Value>
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
