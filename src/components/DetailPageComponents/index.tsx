import { auctionDetailsType } from '@mocks/db';
import { fetchAuctionDetails } from '@utils/fetchAuctionDetails';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
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
      </Functions>
      <ItemDescription description={auctionDetails.description} />
    </Container >
  );
}
