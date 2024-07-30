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
  min-height: 300px;
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
  float: right;
  font-size: 12px;
  padding-right: 10px;
`;
const Div = styled.div`
  margin-bottom: 4px;
`;
const Div2 = styled(Div)`
  margin-left: 17px;
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
        <Div>현재 입찰가 : {currentBidPrice} 원</Div>
        <Div>즉시 구매가 : {buyNowPrice} 원</Div>
        <Div2>입찰건수 : {bidCount}</Div2>
      </Price>
    </Card>
  );
}
