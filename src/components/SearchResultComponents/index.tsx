import PopularCategory from '@components/HomePageComponent/PopularCategory';
import Product from '@components/HomePageComponent/Product';
import { fetchProducts } from '@utils/fetchProducts';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 20px;
  width: 1200px;
  margin: 20px auto 0;
`;

const Grid = styled.div`
  display: grid;
  width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 10px;

  @media (min-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NoResults = styled.div`
  font-size: 16px;
  color: #666;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const Button = styled.button`
  margin: 0 5px;
  width: 40px;
  padding: 10px 10px;
  background-color: #e8e9ec;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  &:disabled {
    border: 1px solid #4fd66e;
    background-color: #4fd66e;
    color: #eee;
  }
`;

const ArrowButton = styled.button`
  margin: 0 5px;
  padding: 10px 10px;
  background-color: #e8e9ec;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  svg {
    width: 16px;
    height: 12px;
    stroke: currentColor;
  }
`;
interface ProductType {
  auctionId: number;
  auctionImage: string;
  title: string;
  bidCount: number;
  buyNowPrice: number;
  currentBidPrice: number;
  favoriteCnt: number;
  endDate: string;
  status: boolean;
  auctionType: boolean;
}

export default function SearchResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';
  const categoryOption = queryParams.get('category') || 'ALL';

  const [products, setProducts] = useState<ProductType[]>([]);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지는 1부터 시작

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const PAGE_GROUP_SIZE = 5;

  const SearchProducts = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const { products: newProducts, totalPages } = await fetchProducts({
        page: currentPage - 1,
        categoryOption,
        keyword,
      });

      setLoading(false);
      setTotalPages(totalPages); // 총 페이지 수 업데이트
      return newProducts;
    } catch (error) {
      setLoading(false);
      setError('불러오지 못했습니다.');
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const initialProducts = await SearchProducts(currentPage);
      setProducts(initialProducts);
    };
    loadData();
  }, [categoryOption, keyword, currentPage]); // initialPage를 의존성 배열에서 제거

  const totalGroups = Math.ceil(totalPages / PAGE_GROUP_SIZE);
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);

  const handlePageClick = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevGroup = () => {
    const newGroup = Math.max(currentGroup - 1, 0);
    const newPage = newGroup * PAGE_GROUP_SIZE + 1;
    handlePageClick(newPage);
  };

  const handleNextGroup = () => {
    const newGroup = Math.min(currentGroup + 1, totalGroups - 1);
    const newPage = newGroup * PAGE_GROUP_SIZE + 1;
    handlePageClick(newPage);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={currentPage === i}
        >
          {i}
        </Button>,
      );
    }

    return buttons;
  };
  return (
    <Wrapper>
      <PopularCategory />
      <Title>검색 결과: "{keyword}"</Title>
      {error && <NoResults>{error}</NoResults>}
      {products.length === 0 && !loading && !error ? (
        <NoResults>검색 결과가 없습니다.</NoResults>
      ) : (
        <>
          <Grid>
            {products.map((product, index) => (
              <Product key={`${product.auctionId}-${index}`} {...product} />
            ))}
          </Grid>
          <Pagination>
            <ArrowButton
              onClick={handlePrevGroup}
              disabled={currentGroup === 0}
            >
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
            </ArrowButton>
            {renderPageButtons()}
            <ArrowButton
              onClick={handleNextGroup}
              disabled={currentPage >= totalPages}
            >
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
            </ArrowButton>
          </Pagination>
        </>
      )}
      {loading && <div>로딩중...</div>}
    </Wrapper>
  );
}
