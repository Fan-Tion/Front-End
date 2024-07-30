import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  width: 304px;
  height: 400px;
  background-color: white;
  margin: 15px;
  cursor: pointer;
  border: 2px solid #cde990;
  border-radius: 15px;
`;
const Image = styled.img`
  width: 300px;
  height: 300px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  display: block;
`;
const Detail = styled.div`
  height: 50px;
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top: 2px solid #cde990;
`;
const Price = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto;
  justify-items: end;
  font-size: 12px;
  align-items: start;
  gap: 4px;
`;
const Div = styled.div``;
const Div2 = styled(Div)`
  margin-left: 17px;
`;
const BidCount = styled.div`
  margin-right: 30px;
`;

interface ProductProps {
  auctionId: number;
  auctionImage: string;
  title: string;
  currentBidPrice: number;
  bidCount: number;
  buyNowPrice: number;
  favoriteCnt: number;
  endDate: string;
  status: boolean;
}

export default function Product({
  auctionId,
  auctionImage,
  title,
  currentBidPrice,
  buyNowPrice,
  bidCount,
}: ProductProps) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/auction/${auctionId}`)}>
      <Image src={auctionImage} alt="Product Image" />
      <Detail>{title}</Detail>
      <Price>
        <Div>현재 입찰가 :</Div>{' '}
        <Div>{currentBidPrice.toLocaleString('ko-KR')} 원</Div>
        <Div>즉시 구매가 :</Div>{' '}
        <Div>{buyNowPrice.toLocaleString('ko-KR')} 원</Div>
        <Div2>입찰 건 수 :</Div2> <BidCount>{bidCount}</BidCount>
      </Price>
    </Card>
  );
}
