import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { auctionApi } from '../../api/auction';
import { auctionDetailsType } from '../../mocks/db';
import AuctionInfoModule from './AuctionInfoModule';
import ImageModule from './ImageModule';
import ItemDescription from './ItemDescription';
import SameKeywordAuctions from './SameKeywordAuctions';
import SellerRating from './SellerRating';
import SteamedButton from './SteamedButton';

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
    const fetchAuctionDetails = async () => {
      try {
        const response = await auctionApi.getDetails(auctionId!);
        setAuctionDetails(response);
      } catch (error) {
        console.log(error)
        navigate('/not-found')
      } finally {
        setLoading(false);
      }
    };

    if (auctionId) {
      fetchAuctionDetails();
    }
  }, [auctionId]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  console.log(auctionDetails)
  return (
    <Container>
      <AuctionContainer>
        <LeftContainer>
          <ImageModule />
        </LeftContainer>
        <RightContainer>
          <AuctionInfoModule title={auctionDetails!.title} category={auctionDetails!.category} />
          <SameKeywordAuctions />
        </RightContainer>
      </AuctionContainer>
      <Functions>
        <SellerRating />
        <SteamedButton />
      </Functions>
      <ItemDescription />
    </Container >
  );
}
