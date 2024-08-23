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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0px;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  gap: 10px;
`;

const BackButton = styled.button`
  position: relative;
  right: 220px;
  bottom: 130px;
  border: none;
  background-color: white;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
  }
  &:hover {
    color: #4fd66e;
  }
`;
const Buy = styled.div`
  display: flex;
`;
const Button = styled(AllButton)`
  width: 180px;
  margin-top: 180px;
  font-size: 16px;
  border-radius: 6px;
  margin-right: 0px;
  background-color: #4fd66e;
  &:hover {
    color: #e8e9ec;
    background-color: #4fd66e;
  }
`;
const Button2 = styled(AllButton)`
  width: 320px;
  margin-top: 180px;
  font-size: 16px;
  border-radius: 6px;
  margin-right: 0px;
  background-color: #4fd66e;
  &:hover {
    color: #e8e9ec;
    background-color: #4fd66e;
  }
`;
const Cancel = styled(AllButton)`
  width: 180px;
  margin-top: 180px;
  font-size: 16px;
  margin-left: 20px;
  border-radius: 6px;
  background-color: #e8e9ec;
  &:hover {
    background-color: #e8e9ec;
    color: #4fd66e;
  }
`;

const Link = styled.span`
  cursor: pointer;
  margin-left: 10px;
  position: relative;
`;
const UnderlinedText = styled.span`
  text-decoration: underline wavy;
  color: #4fd66e;
  &:hover {
    text-decoration: none;
  }
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
      alert('물품 인수에 실패했습니다.\n물품 인계 전에는 인수할 수 없습니다.');
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
  const cancelBuy = async () => {
    try {
      await TradeApi.cancel({ auctionId });

      alert('물품 구매가 철회되었습니다.');
    } catch (error) {
      alert('구매 철회에 실패했습니다, 물품이 이미 인계되었습니다.');
    }
  };

  return (
    <>
      <DetailWrapper>
        <DetailTitle>{trade.title}</DetailTitle>
        <BackButton onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </BackButton>
        <DetailContent>
          <div>
            <span>경매 제목 : {trade.title}</span>
            <Link onClick={() => navigate(`/auction/${trade.auctionId}`)}>
              (<UnderlinedText> 바로가기 </UnderlinedText>)
            </Link>
          </div>
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
        </DetailContent>
        {isBuyList ? (
          <Buy>
            <Button onClick={confirmReceipt}>물품 인수 확인</Button>
            <Cancel onClick={cancelBuy}>구매 철회</Cancel>
          </Buy>
        ) : (
          <Button2 onClick={confirmDelivery}>물품 인계 확인</Button2>
        )}
      </DetailWrapper>
    </>
  );
}
