import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  margin: 30px 15px 0;
  border-radius: 20px;
`;
const Image = styled.img`
  width: 300px;
  height: 300px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
const Detail = styled.div`
  height: 50px;
  padding: 5px 5px;
`;
const Price = styled.div`
  float: right;
  font-size: 12px;
  padding-right: 10px;
`;
const Div = styled.div`
  margin-bottom: 4px;
`;
const Div2 = styled(Div)`
  margin-left: 17px;
`;
export default function Product() {
  return (
    <Card>
      <Image src="https://via.placeholder.com/300" alt="Dummy"></Image>
      <Detail>상품 설명</Detail>
      <Price>
        <Div>현재 입찰가 : 55,000 원</Div>
        <Div>즉시 구매가 : 70,000 원</Div>
        <Div2>입찰건수 : 3</Div2>
      </Price>
    </Card>
  );
}
