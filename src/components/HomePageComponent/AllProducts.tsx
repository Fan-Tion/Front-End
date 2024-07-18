import {
  Category,
  Div,
  ProductBox,
  Text,
  Wrap,
} from '../../styled-components/HomePageStyle';
import Product from './Product';

export default function AllProducts() {
  return (
    <Wrap>
      <ProductBox $bgColor="#c4c4c4">
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
