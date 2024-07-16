import Product from './Product';
import {
  Wrap,
  ProductBox,
  Category,
  Text,
  Div,
} from '../../styled-components/HomePageStyle';

export default function AllProducts() {
  return (
    <Wrap>
      <ProductBox $bgColor="#FFFFE8">
        <Category>
          <Text $fontSize="20px" $fontColor="black">
            전체 상품 리스트
          </Text>
          <Text as="a" href="/" $fontSize="16px" $fontColor="#black">
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
