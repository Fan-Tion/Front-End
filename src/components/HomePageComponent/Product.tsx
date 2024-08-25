import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  height: 400px;
  background-color: white;
  cursor: pointer;
  // border: 2px solid #cde990;
  border-radius: 15px;
  margin-top: 30px;
`;
const Image = styled.img<{ $status: boolean }>`
  width: 100%;
  max-width: 300px; /* 최대 너비를 설정하여 너무 커지지 않도록 제한 */
  aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */
  border-radius: 15px;
  display: block;
  object-fit: cover; /* 대표이미지가 일그러지지 않도록 */
  filter: ${({ $status }) => ($status ? 'none' : 'grayscale(85%)')};
`;
const Detail = styled.div`
  height: 50px;
  padding: 5px;
  line-height: 1.5;
  font-weight: 600;
  // white-space: nowrap;
  // overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.div`
  display: grid;
  padding-right: 5px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto;
  justify-items: end;
  font-size: 14px;
  font-weight: 400;
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
const Status = styled.div<{ $status: boolean }>`
  border-bottom: 3px solid ${({ $status }) => ($status ? '#4fd66e' : 'red')};
  margin-left: 45px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 70%;
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
  auctionType: boolean;
}

export default function Product({
  auctionId,
  auctionImage,
  title,
  currentBidPrice,
  buyNowPrice,
  bidCount,
  auctionType,
  status,
}: ProductProps) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/auction/${auctionId}`)}>
      <Image src={auctionImage[0]} alt="Product Image" $status={status} />
      <Detail>
        {auctionType ? `[공개 입찰] ${title}` : `[비공개 입찰] ${title}`}
      </Detail>
      <Status $status={status} />

      <Price>
        <Div>현재 입찰가 :</Div>{' '}
        <Div>{currentBidPrice.toLocaleString('ko-KR')} 원</Div>
        <Div>즉시 구매가 :</Div>{' '}
        <Div>{buyNowPrice.toLocaleString('ko-KR')} 원</Div>
        <Div2>입찰 건수 :</Div2> <BidCount>{bidCount}</BidCount>
      </Price>
    </Card>
  );
}
