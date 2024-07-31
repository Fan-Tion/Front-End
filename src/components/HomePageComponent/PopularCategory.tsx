import { categoryApi } from '@api/popularcategory';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AllButton,
  Category,
  PopBox,
  ProductBox,
  Text,
  Wrap,
} from '../../styled-components/HomePageStyle';
import CategoryCard from './Category';

interface CategoryType {
  title: string;
  category: string;
}

const categoryImages: { [key: string]: string } = {
  ACCESSORIES: 'img/CategoryImg/ACCESSORIES.png',
  ALBUM: 'img/CategoryImg/ALBUM.png',
  ALL: 'img/CategoryImg/ALL.png',
  CLOTHES: 'img/CategoryImg/CLOTHES.png',
  FIGURE: 'img/CategoryImg/FIGURE.png',
  GAME: 'img/CategoryImg/GAME.png',
  OTHER: 'img/CategoryImg/OTHER.png',
  PHOTO_CARD: 'img/CategoryImg/PHOTO_CARD.png',
  POSTER: 'img/CategoryImg/POSTER.png',
  SIGN: 'img/CategoryImg/SIGN.png',
};

export default function PopularCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getFavoriteCategories();

        if (Array.isArray(response.data)) {
          const sortedCategories = response.data.sort((a, b) =>
            a.title.localeCompare(b.title),
          );
          setCategories(sortedCategories);
        }
      } catch (error) {
        setError('서버에서 카테고리를 가져오지 못했습니다.');
      }
    };
    fetchCategories();
  }, []);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };
  const handleCategoryClick = (categoryTitle: string) => {
    navigate(
      `/auction/search?searchOption=CATEGORY&categoryOption=${categoryTitle}&keyword=&page=0`,
    );
  };

  return (
    <Wrap>
      <ProductBox $bgColor="#FFFFE8">
        <Category>
          <Text $fontSize="20px" $fontColor="black">
            인기 카테고리
          </Text>
          <AllButton onClick={handleToggleShowAll}>
            {showAll ? '접기' : '더 보기'}
          </AllButton>
        </Category>
        <PopBox>
          {(showAll ? categories : categories.slice(0, 5)).map(category => (
            <CategoryCard
              key={category.title}
              title={category.title}
              imageSrc={
                categoryImages[category.title] ||
                'https://via.placeholder.com/300'
              }
              onClick={() => handleCategoryClick(category.title)}
            />
          ))}
        </PopBox>
        {error && (
          <Text $fontSize="16px" $fontColor="red">
            {error}
          </Text>
        )}
      </ProductBox>
    </Wrap>
  );
}
