import { auctionApi } from '@api/auction';
import _ from 'lodash';
import { useCallback } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  background-color: #fff;
  padding: 30px;
  border: 1px solid #ddd;
  width: 300px;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  font-size: 36px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #333;
  }
  left: 260px;
  bottom: 134px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #007bff;
  }
  &:active {
    background-color: #007bff;
  }
`;

interface BuyNowPropsType {
  buyNowPrice: number;
  auctionId: string;
  toggleModal: () => void;
  toggleTrigger: () => void;
}

export default function BuyNow({
  buyNowPrice,
  auctionId,
  toggleModal,
  toggleTrigger,
}: BuyNowPropsType) {
  const localStringPrice = buyNowPrice.toLocaleString();

  const buyNowHandler = useCallback(
    _.debounce(async () => {
      if (
        confirm(`즉시 구매가는 ${localStringPrice}입니다. 정말로 구매할까요?`)
      ) {
        try {
          const response = await auctionApi.buyNow(auctionId);
          alert(
            `${response.buyNowPrice.toLocaleString()}원에 구매 성공했습니다. 남은 예치금 : ${response.balance.toLocaleString()}원`,
          );
        } catch (error) {
          const errorResponse = error as {
            response: {
              data: { errorCode: string; message: string; status: string };
            };
          };
          const { message } = errorResponse.response.data;

          alert(message);
        } finally {
          toggleModal();
          toggleTrigger();
        }
      }
    }, 600),
    [],
  );

  return (
    <Content>
      <Header>
        <Title>즉시 구매</Title>
        <CloseButton onClick={() => window.location.reload()}>
          &times;
        </CloseButton>
      </Header>
      <Row>
        <Label>즉시 구매가 :</Label>
        <Value>{localStringPrice} 원</Value>
      </Row>
      <Button type="button" onClick={buyNowHandler}>
        지금 구매하기
      </Button>
    </Content>
  );
}
