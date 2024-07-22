import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  display : flex;
  width : 100%;
  justify-content : center;
  align-items : center;
`

const CategoryWrap = styled.div`
 
`

const CategoryTitle = styled.h1`
  display : flex;
  font-size : 36px;
  margin-top : 20px;
  font-weight : bold;

  
`
const CategoryList = styled.div`
  
`




export default function PopularCategoryPageComponent() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchOption = queryParams.get('searchOption');
  const categoryOption = queryParams.get('categoryOption');
  const keyword = queryParams.get('keyword');
  const page = queryParams.get('page');

  useEffect(() => {
    console.log({ searchOption, categoryOption, keyword, page });
  }, [searchOption, categoryOption, keyword, page]);

  return (
    <Wrap>
    <CategoryWrap>
      <CategoryTitle>{categoryOption}</CategoryTitle>
      <CategoryList></CategoryList>
    </CategoryWrap>
    </Wrap>
  );
}
