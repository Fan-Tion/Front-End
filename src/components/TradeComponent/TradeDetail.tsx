import { TradeApi } from '@api/trade';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AllButton } from '../../styled-components/HomePageStyle';

interface Member {
  memberId: number;
  email: string;
  password: string;
  nickname: string;
  auth: boolean;
  isKakao: boolean;
  isNaver: boolean;
  address: string;
  phoneNumber: string;
  totalRating: number;
  ratingCnt: number;
  rating: number;
  status: string;
  profileImage: string | null;
  linkedEmail: string | null;
  createDate: string;
  withdrawalDate: string | null;
}

interface Trade {
  auctionId: number;
  title: string;
  member: Member;
  category: string | null;
  auctionType: boolean;
  auctionImage: string | null;
  description: string;
  currentBidPrice: number;
  currentBidder: string;
  buyNowPrice: number;
  favoriteCnt: number;
  createDate: string;
  endDate: string;
  status: boolean;
  sendChk: boolean;
  receiveChk: boolean;
}

interface TradeDetailProps {
  trade: Trade;
  listType: 'buyList' | 'sellList';
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

const BackButton = styled(AllButton)`
  position: relative;
  right: 20px;
  bottom: 150px;
  border-radius: 6px;
`;

const Button = styled(AllButton)`
  width: 180px;
  margin-top: 40px;
  font-size: 16px;
  border-radius: 6px;
`;
const Link = styled(AllButton)`
  margin-left: 160px;
  margin-top: 100px;
`;

export default function TradeDetail({
  trade,
  listType,
  onBack,
}: TradeDetailProps) {
  const navigate = useNavigate();
  const isBuyList = listType === 'buyList';
  // const [searchParams] = useSearchParams();
  const auctionId = trade.auctionId;
  const confirmReceipt = async () => {
    try {
      await TradeApi.receipt({ auctionId });

      alert('물품 인수 확인이 완료되었습니다.');
    } catch (error) {
      alert('물품 인수 확인에 실패했습니다.');
    }
  };
  const confirmDelivery = async () => {
    try {
      await TradeApi.delivery({ auctionId });

      alert('물품 인계 확인이 완료되었습니다.');
    } catch (error) {
      alert('물품 인계 확인에 실패했습니다.');
    }
  };

  return (
    <>
      <BackButton onClick={onBack}>뒤로가기</BackButton>
      <DetailWrapper>
        <DetailTitle>{trade.title}</DetailTitle>
        <DetailContent>
          <p>
            {isBuyList ? '판매자' : '구매자'} 메일: {trade.member.email}
          </p>
          <p>
            {isBuyList ? '판매자' : '구매자'} 전화번호:
            {trade.member.phoneNumber}
          </p>
          <p>
            {isBuyList ? '판매자' : '구매자'} 닉네임: {trade.member.nickname}
          </p>
          <Link onClick={() => navigate(`/auction/${trade.auctionId}`)}>
            상세페이지
          </Link>
        </DetailContent>
        {isBuyList ? (
          <Button onClick={confirmReceipt}>물품 인수 확인</Button>
        ) : (
          <Button onClick={confirmDelivery}>물품 인계 확인</Button>
        )}
      </DetailWrapper>
    </>
  );
}
