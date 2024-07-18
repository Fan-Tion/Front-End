import {
  Category,
  Div,
  ProductBox,
  Text,
  Wrap,
} from '../../styled-components/HomePageStyle';
import CategoryCard from './Category';

export default function PopularCategory() {
  return (
    <Wrap>
      <ProductBox $bgColor="#c4c4c4">
        <Category>
          <Text $fontSize="20px" $fontColor="black">
            인기 카테고리
          </Text>
          <Text as="a" href="/" $fontSize="16px" $fontColor="#black">
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
