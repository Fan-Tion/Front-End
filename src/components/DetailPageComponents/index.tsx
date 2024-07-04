import React from 'react';
import styled from 'styled-components';
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

const AuctionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media (max-width: 768px) {
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
  return (
    <Container>
      <AuctionContainer>
        <LeftContainer>
          <ImageModule />
        </LeftContainer>
        <RightContainer>
          <AuctionInfoModule />
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
