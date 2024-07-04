import React from 'react';
import styled from 'styled-components';
const Div = styled.div`
  text-align: center;
  margin-top: 30px;
`;
const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  border-radius: 20px;
`;
const CategoryName = styled.div`
  font-size: 16pt;
  font-weight: bold;
  margin-top: 50px;
`;
export default function CategoryCard() {
  return (
    <Div>
      <Image src="https://via.placeholder.com/300" alt="Dummy" />
      <CategoryName>카테고리</CategoryName>
    </Div>
  );
}
