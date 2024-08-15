import { categoryApi } from '@api/popularcategory';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CategoryBox,
  PopBox,
  ScrollButton,
  Text,
  Wrap,
} from '../../styled-components/HomePageStyle';
import CategoryCard from './Category';

interface CategoryType {
  title: string;
  category: string;
}

const categoryName: { [key: string]: string } = {
  ACCESSORIES: '액세서리',
  ALBUM: '앨범',
  ALL: '전체',
  CLOTHES: '의류',
  FIGURE: '피규어',
  GAME: '게임',
  OTHER: '기타',
  PHOTO_CARD: '포토카드',
  POSTER: '포스터',
  SIGN: '싸인',
};

const categoryImages: { [key: string]: string } = {
  ACCESSORIES: '/img/CategoryImg/ACCESSORIES.png',
  ALBUM: '/img/CategoryImg/ALBUM.png',
  ALL: '/img/CategoryImg/ALL.png',
  CLOTHES: '/img/CategoryImg/CLOTHES.png',
  FIGURE: '/img/CategoryImg/FIGURE.png',
  GAME: '/img/CategoryImg/GAME.png',
  OTHER: '/img/CategoryImg/OTHER.png',
  PHOTO_CARD: '/img/CategoryImg/PHOTO_CARD.png',
  POSTER: '/img/CategoryImg/POSTER.png',
  SIGN: '/img/CategoryImg/SIGN.png',
};

export default function PopularCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showAll] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleCategoryClick = (categoryTitle: string) => {
    navigate(
      `/auction/search?searchOption=CATEGORY&categoryOption=${categoryTitle}&keyword=&page=0`,
    );
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 122, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -122, behavior: 'smooth' });
    }
  };
  return (
    <Wrap>
      <CategoryBox $bgColor="white">
        <ScrollButton onClick={scrollLeft}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </ScrollButton>{' '}
        <PopBox ref={scrollRef}>
          {(showAll ? categories : categories.slice(0, 5)).map(category => (
            <CategoryCard
              key={category.title}
              title={categoryName[category.title] || category.title}
              imageSrc={
                categoryImages[category.title] ||
                'https://via.placeholder.com/300'
              }
              onClick={() => handleCategoryClick(category.title)}
            />
          ))}
        </PopBox>
        <ScrollButton onClick={scrollRight}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </ScrollButton>{' '}
        {/* 오른쪽 이동 버튼 */}
        {error && (
          <Text $fontSize="16px" $fontColor="red">
            {error}
          </Text>
        )}
      </CategoryBox>
    </Wrap>
  );
}
