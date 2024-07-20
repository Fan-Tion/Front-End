import { useEffect, useState } from 'react';
import { categoryApi } from '../../api/popularcategory';
import {
  Category,
  Div,
  ProductBox,
  Text,
  Wrap,
} from '../../styled-components/HomePageStyle';
import CategoryCard from './Category';

interface CategoryType {
  title: string;
  category: string;
}

export default function PopularCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getFavoriteCategories();
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        setError('서버에서 카테고리를 가져오지 못했습니다.');
      }
    };
    fetchCategories();
  }, []);

  return (
    <Wrap>
      <ProductBox $bgColor="#FFFFE8">
        <Category>
          <Text $fontSize="20px" $fontColor="black">
            인기 카테고리
          </Text>
          <Text as="a" href="/" $fontSize="16px" $fontColor="black">
            더 보기
          </Text>
        </Category>
        <Div>
          {categories.slice(0, 5).map(category => (
            <CategoryCard
              key={category.title}
              title={category.title}
              imageSrc="https://via.placeholder.com/300" // 교체
            />
          ))}
        </Div>
      </ProductBox>
    </Wrap>
  );
}
