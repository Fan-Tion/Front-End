import { auctionApi } from '@api/auction';
import { useModalHandler } from '@hooks/useModalHandler';
import { auctionDetailsType } from '@mocks/db';
import { fetchAuctionDetails } from '@utils/fetchAuctionDetails';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalButton } from '../../styled-components/Globalstyle';
import {
  AuctionInfoModule,
  ImageModule,
  ItemDescription,
  SameKeywordAuctions,
  SellerRating,
  SteamedButton
} from './atom';


const Container = styled.div`
  margin: 30px auto;
  text-align: center;
  max-width: 2048px;
  width: 80vw;
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

// 스타일드 컴포넌트 정의
const AuctionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
`

const Functions = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 16px;
`

export default function DetailPageComponents() {
  const { auctionId } = useParams<{ auctionId: string }>();
  const navigate = useNavigate()
  const [auctionDetails, setAuctionDetails] = useState<auctionDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isModalOpen, toggleModal } = useModalHandler()

  useEffect(() => {
    if (auctionId) {
      fetchAuctionDetails(auctionId, setAuctionDetails, setLoading, navigate);
    }
  }, [auctionId, navigate]);

  const buyNowHandler = useCallback(_.debounce(async () => {
    console.log('buyNowHandler clicked');
  }, 500), []);

  const bidHandler = useCallback(_.debounce(async () => {
    console.log('bidHandler clicked');
  }, 500), []);

  const deleteHandler = async () => {
    if (!auctionId) return;

    const ok = confirm('Are you sure you want to delete?');

    if (ok) {
      try {
        const response = await auctionApi.deleteAuction(auctionId);

        if (response.data === true) navigate('/');
        else throw new Error('삭제 실패')
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (loading || auctionDetails === null) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <AuctionContainer>
        <LeftContainer>
          <ImageModule imageUrls={auctionDetails.auctionImage} />
        </LeftContainer>
        <RightContainer>
          <AuctionInfoModule details={auctionDetails} buyNow={buyNowHandler} bidHandler={bidHandler} />
          <SameKeywordAuctions />
        </RightContainer>
      </AuctionContainer>
      <Functions>
        {auctionDetails.auctionUserRating ? <SellerRating rating={auctionDetails.auctionUserRating} /> : null}
        <SteamedButton />
        {/* 작성자 여부 검증후 조건부 랜더링 */}
        <div>
          <GlobalButton type='button' onClick={() => navigate(`/auction/editor/${auctionId}`)}>경매 수정</GlobalButton>
          <GlobalButton type='reset' onClick={deleteHandler}>경매 삭제</GlobalButton>
        </div>
      </Functions>
      <button onClick={toggleModal}>신고하기</button>
      <ItemDescription description={auctionDetails.description} />

      <Modal isOpen={isModalOpen} onRequestClose={toggleModal} style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: 0,
          border: 'none',
          background: 'none'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        }
      }}>
        <section>접수하기</section>
        <div>
          신고 사유를 작성해 주세요.
        </div>
        <textarea />
      </Modal>
    </Container >
  );
}
