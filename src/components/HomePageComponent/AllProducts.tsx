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
  grid-template-columns: repeat(5, 1fr);
  gap: 10x;
`;

const Button = styled(AllButton)`
  width: 80px;
  height: 40px;
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
}

export default function AllProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2); // 1페이지는 이미 로드됨
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

  const fetchProducts = async (pageNumber: number): Promise<ProductType[]> => {
    try {
      const response = await productListApi.getProductList({ pageNumber });

      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  };

  const fetchMoreData = async () => {
    const newProducts = await fetchProducts(pageNumber);
    if (newProducts.length === 0) {
      setHasMore(false);
    } else {
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setPageNumber(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const initialProducts = await fetchProducts(1);
      setProducts(initialProducts);
    };
    loadInitialData();
  }, []);

  const handleButtonClick = async () => {
    if (infiniteScrollEnabled) {
      const initialProducts = await fetchProducts(1);
      setProducts(initialProducts);
      setPageNumber(2);
      setHasMore(true);
    } else {
      fetchMoreData();
    }
    setInfiniteScrollEnabled(!infiniteScrollEnabled);
  };

  return (
    <Wrap>
      <ProductBox $bgColor="#FFFFE8">
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
            loader={<h4>Loading...</h4>}
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
