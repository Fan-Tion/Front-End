import { productListApi } from '@api/productlist';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import {
  AllButton,
  Category,
  ProductBox,
  Text,
  Wrap,
} from '../../styled-components/HomePageStyle';
import Product from './Product';
import ScrollButton from './ScrollButton';

const Grid = styled.div`
  display: grid;
  min-height: 650px;
  grid-template-columns: repeat(
    4,
    minmax(250px, 1fr)
  ); /* 기본적으로 한 줄에 4개의 상품 */
  gap: 20px;
  padding-left: 5px;
  margin-bottom: 100px;
`;

const Button = styled(AllButton)`
  width: 80px;
  height: 40px;
  background-color: white;
  &:hover {
    background-color: white;
    color: #4fd66e;
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

export default function AllProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); // 0페이지는 이미 로드됨
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

  const fetchProducts = async (page: number): Promise<ProductType[]> => {
    try {
      const response = await productListApi.getProductList({
        page: page,
      });
      return Array.isArray(response.data.content) ? response.data.content : [];
    } catch (error) {
      return [];
    }
  };

  // 0페이지 로드
  useEffect(() => {
    const loadInitialData = async () => {
      const initialProducts = await fetchProducts(0);
      setProducts(initialProducts);
    };
    loadInitialData();
  }, []);

  // 1페이지부터
  const fetchMoreData = async () => {
    const newProducts = await fetchProducts(page);
    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleButtonClick = async () => {
    if (infiniteScrollEnabled) {
      const initialProducts = await fetchProducts(0);
      setProducts(initialProducts);
      setPage(1);
      setHasMore(true);
    } else {
      await fetchMoreData();
    }
    setInfiniteScrollEnabled(!infiniteScrollEnabled);
  };

  return (
    <Wrap>
      <ProductBox $bgColor="#FFF">
        <Category>
          <Text $fontSize="20px" $fontColor="black">
            전체 상품 리스트
          </Text>
          <Button onClick={handleButtonClick}>
            {infiniteScrollEnabled ? '접기' : '더 보기'}
          </Button>
        </Category>
        {products.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : infiniteScrollEnabled ? (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div>Loading...</div>}
            style={{ overflow: 'visible' }}
          >
            <Grid>
              {products.map((product, index) => (
                <Product key={index} {...product} />
              ))}
            </Grid>
          </InfiniteScroll>
        ) : (
          <Grid>
            {products.map((product, index) => (
              <Product key={index} {...product} />
            ))}
          </Grid>
        )}
        <ScrollButton />
      </ProductBox>
    </Wrap>
  );
}
