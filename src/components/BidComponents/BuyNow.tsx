import { auctionApi } from "@api/auction";
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

interface BuyNowPropsType {
  buyNowPrice: number;
  auctionId: string;
}

export default function BuyNow({ buyNowPrice, auctionId }: BuyNowPropsType) {

  const localStringPrice = buyNowPrice.toLocaleString();

  const buyNowHandler = async () => {
    if (confirm(`즉시 구매가는 ${localStringPrice}입니다. 정말로 구매할까요?`)) {
      try {
        const response = await auctionApi.buyNow(auctionId);
        alert(`${response.buyNowPrice.toLocaleString()}원에 구매 성공했습니다. 남은 예치금 : ${response.balance.toLocaleString()}원`)
      } catch (error) {
        console.error(error);
      } finally {
        window.location.reload();
      }
    }
  }
  return (
    <Content>
      <label>
        즉시 구매가 :
      </label>
      <span>
        {localStringPrice} 원
      </span>
      <button type='button' onClick={buyNowHandler}>지금 구매하기</button>
    </Content>
  )
}
