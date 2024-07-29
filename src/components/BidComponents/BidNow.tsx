import { auctionApi } from "@api/auction";
import { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
  position: relative;
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
`;

interface BidNowPropsType {
  currentBidPrice: number;
  auctionId: string;
  buyNowPrice: number;
}

export default function BidNow({ currentBidPrice, auctionId, buyNowPrice }: BidNowPropsType) {
  const localStringBidPrice = currentBidPrice.toLocaleString();
  const localStringBuyPrice = buyNowPrice.toLocaleString();
  const [bidPrice, setBidPrice] = useState(0);
  const [formattedBidPrice, setFormattedBidPrice] = useState('');

  const bidHandler = async () => {
    const data = {
      auctionId,
      bidPrice
    }
    try {
      const response = await auctionApi.bidNow(data)
      alert(`${response.bidPrice.toLocaleString()}원에 입찰 성공했습니다.`)
    } catch (error) {
      console.error(error)
    } finally {
      window.location.reload();
    }
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/,/g, '');
    if (!/^\d*$/.test(numericValue)) return; // 정수인지 검사
    setBidPrice(Number(numericValue));
    setFormattedBidPrice(Number(numericValue).toLocaleString());
  };

  return (
    <Content>
      <div>
        <label>
          현재가 :
        </label>
        <span>
          {localStringBidPrice} 원
        </span>
      </div>
      <div>
        <label>
          즉시구매가 :
        </label>
        <span>
          {localStringBuyPrice} 원
        </span>
      </div>
      <div>
        <input type="text" value={formattedBidPrice} onChange={inputHandler} />
      </div>
      <button type='button' onClick={bidHandler} >입찰하기</button>
    </Content>
  )
}
