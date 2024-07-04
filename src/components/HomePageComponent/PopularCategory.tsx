import React from 'react';
import CategoryCard from './Category';
import {
  Wrap,
  ProductBox,
  Category,
  Text,
  Div,
} from '../../styled-components/HomePageStyle';

export default function PopularCategory() {
  return (
    <Wrap>
      <ProductBox bgColor="#c4c4c4">
        <Category>
          <Text fontSize="16pt" fontColor="black">
            인기 카테고리
          </Text>
          <Text as="a" href="/" fontSize="12pt" fontColor="#black">
            더 보기
          </Text>
        </Category>
        <Div>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </Div>
      </ProductBox>
    </Wrap>
  );
}
