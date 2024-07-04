import React from 'react';
import Product from './Product';
import {
  Wrap,
  ProductBox,
  Category,
  Text,
  Div,
} from '../../styled-components/HomePageStyle';

export default function RecentlyViewedProducts() {
  return (
    <Wrap>
      <ProductBox bgColor="#c4c4c4">
        <Category>
          <Text fontSize="16pt" fontColor="black">
            최근 본 상품
          </Text>
          <Text as="a" href="/" fontSize="12pt" fontColor="#black">
            더 보기
          </Text>
        </Category>
        <Div>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </Div>
      </ProductBox>
    </Wrap>
  );
}
