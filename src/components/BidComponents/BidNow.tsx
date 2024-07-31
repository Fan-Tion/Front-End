import { auctionApi } from "@api/auction";
import _ from "lodash";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Content = styled.div`
  position: relative;
  background-color: #fff;
  padding: 30px;
  border: 1px solid #ddd;
  width: 90%;
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
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #333;
  }
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  &:active {
    background-color: #004494;
  }
`;

interface BidNowPropsType {
  currentBidPrice: number;
  auctionId: string;
  buyNowPrice: number;
  toggleModal: () => void;
  toggleTrigger: () => void;
}

export default function BidNow({ currentBidPrice, auctionId, buyNowPrice, toggleModal, toggleTrigger }: BidNowPropsType) {
  const localStringBidPrice = currentBidPrice.toLocaleString();
  const localStringBuyPrice = buyNowPrice.toLocaleString();
  const [bidPrice, setBidPrice] = useState(0);
  const [formattedBidPrice, setFormattedBidPrice] = useState('');

  const bidHandler = useCallback(_.debounce(async () => {
    const data = {
      auctionId,
      bidPrice
    }
    try {
      const response = await auctionApi.bidNow(data)
      alert(`${response.data.bidPrice.toLocaleString()}원에 입찰 성공했습니다.`)
    } catch (error) {
      console.error(error)
    } finally {
      toggleModal()
      toggleTrigger()
    }
  }, 600), [bidPrice, auctionId])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/,/g, '');
    if (!/^\d*$/.test(numericValue)) return; // 정수인지 검사
    setBidPrice(Number(numericValue));
    setFormattedBidPrice(Number(numericValue).toLocaleString());
  };

  return (
    <Content>
      <Header>
        <Title>입찰하기</Title>
        <CloseButton onClick={() => window.location.reload()}>&times;</CloseButton>
      </Header>
      <Row>
        <Label>현재가 :</Label>
        <Value>{localStringBidPrice} 원</Value>
      </Row>
      <Row>
        <Label>즉시구매가 :</Label>
        <Value>{localStringBuyPrice} 원</Value>
      </Row>
      <Input
        type="text"
        value={formattedBidPrice}
        onChange={inputHandler}
        placeholder="입찰가를 입력하세요"
      />
      <Button type='button' onClick={bidHandler}>입찰하기</Button>
    </Content>
  )
}
