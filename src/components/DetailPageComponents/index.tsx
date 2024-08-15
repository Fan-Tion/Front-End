import { auctionApi } from '@api/auction';
import { BidNow, BuyNow } from '@components/BidComponents';
import LoadingScreen from '@components/LoadingScreen';
import { useModalHandler } from '@hooks/useModalHandler';
import { auctionDetailsType } from '@mocks/db';
import { fetchAuctionDetails } from '@utils/fetchAuctionDetails';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';
import {
  AuctionInfoModule,
  BidingHistory,
  ImageModule,
  ItemDescription,
  SellerRating,
  SteamedButton,
} from './atom';
interface CustomJwtPayload {
  sub: string;
  memberId: number;
  nickname: string;
  roles: string[];
  iat: number;
  exp: number;
}
const Container = styled.div`
  width: 1200px;
  margin: 30px auto;
  text-align: center;
`;

const sizes = {
  desktop: '1024px',
  tablet: '768px',
  phone: '576px',
};

const media = {
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  phone: `(max-width: ${sizes.phone})`,
};

const AuctionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px;
  @media ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div``;

const Functions = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 16px;
`;

const ReportButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
  &:hover {
    color: darkgray;
  }
  &:focus {
    outline: none;
  }
`;

const EditButton = styled(GlobalButton)`
  font-size: 16px;
`;

const DeleteButton = styled(GlobalButton)`
  align-items: center;
  background-color: #ffaaaa;
  border: 1px solid #ffaaaa;
  cursor: pointer;
  font-size: 16px;
  color: #eee;

  &:hover {
    color: #eee;
    background-color: #ff6666;
    border: 1px solid #ff6666;
  }
`;

const OwnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const SellerWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    background: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export default function DetailPageComponents() {
  const [auctionDetails, setAuctionDetails] =
    useState<auctionDetailsType | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null,
  );
  const [renderTrigger, setRenderTrigger] = useState(false);
  const { isModalOpen, toggleModal } = useModalHandler(false);
  const { auctionId } = useParams<{ auctionId: string }>();
  const isLoggedIn = !!Cookies.get('Authorization');
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (auctionId) {
      fetchAuctionDetails(auctionId, setAuctionDetails, navigate);
    }
  }, [auctionId, renderTrigger]);

  useEffect(() => {
    const accessToken = Cookies.get('Authorization');

    if (accessToken) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);

        const storedNickname = decodedToken.nickname;

        if (storedNickname) {
          setNickname(storedNickname);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const toggleTrigger = () => {
    setRenderTrigger(prev => !prev);
  };

  const buyNowHandler = useCallback(
    _.debounce(async () => {
      console.log('buyNowHandler clicked');
      if (!auctionId) return;
      if (auctionDetails !== null) {
        setModalContent(
          <BuyNow
            auctionId={auctionId}
            buyNowPrice={auctionDetails.buyNowPrice}
            toggleModal={toggleModal}
            toggleTrigger={toggleTrigger}
          />,
        );
        toggleModal();
      }
    }, 500),
    [auctionDetails],
  );

  const bidHandler = useCallback(
    _.debounce(async () => {
      console.log('bidHandler clicked');
      if (!auctionId) return;
      if (auctionDetails !== null) {
        setModalContent(
          <BidNow
            auctionId={auctionId}
            currentBidPrice={auctionDetails.currentBidPrice}
            buyNowPrice={auctionDetails.buyNowPrice}
            toggleModal={toggleModal}
            toggleTrigger={toggleTrigger}
          />,
        );
        toggleModal();
      }
    }, 500),
    [auctionDetails],
  );

  const deleteHandler = async () => {
    if (!auctionId) return;

    if (confirm('정말로 경매를 삭제할까요?')) {
      try {
        const response = await auctionApi.deleteAuction(auctionId);

        if (response.data === true) navigate('/');
        else throw new Error('삭제 실패');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleReport = async () => {
    if (confirm('부적절한 경매로 신고하시겠습니까?')) {
      try {
        if (!auctionId) return;
        const response = await auctionApi.ReportAuction(auctionId);
        console.log('handleReport response : ' + response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (auctionDetails === null) {
    return <LoadingScreen />;
  }

  if (!auctionId) {
    navigate('/not-found');
    return;
  }

  return (
    <Container>
      <AuctionContainer>
        <LeftContainer>
          <ImageModule
            details={auctionDetails}
            imageUrls={auctionDetails.auctionImage}
          />
        </LeftContainer>
        <RightContainer>
          <AuctionInfoModule
            isLoggedIn={isLoggedIn}
            details={auctionDetails}
            buyNow={buyNowHandler}
            bidHandler={bidHandler}
          />
          {isLoggedIn && <BidingHistory auctionId={auctionId} />}
        </RightContainer>
      </AuctionContainer>
      <Functions>
        {isLoggedIn && <SteamedButton auctionId={auctionId} />}
        <OwnerDiv>
          <EditButton
            type="button"
            onClick={() =>
              navigate(`/auction/modify/${auctionId}`, {
                state: { auctionDetails },
              })
            }
          >
            경매 수정
          </EditButton>
          {auctionDetails.auctionUserNickname === nickname && (
            <>
              <EditButton
                type="button"
                onClick={() =>
                  navigate(`/auction/modify/${auctionId}`, {
                    state: { auctionDetails },
                  })
                }
              >
                경매 수정
              </EditButton>
              <DeleteButton type="button" onClick={deleteHandler}>
                경매 삭제
              </DeleteButton>
            </>
          )}
        </OwnerDiv>
        <ReportButton onClick={handleReport}>신고하기</ReportButton>
      </Functions>
      <SellerWrapper>
        {`판매자 : ${auctionDetails.auctionUserNickname}`}
        {auctionDetails.rating ? (
          <SellerRating rating={auctionDetails.rating} />
        ) : null}
      </SellerWrapper>
      <ItemDescription description={auctionDetails.description} />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        style={modalStyle}
      >
        {modalContent}
      </ReactModal>
    </Container>
  );
}
