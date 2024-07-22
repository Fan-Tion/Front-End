import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    <div>
      <h1>{categoryOption}</h1>
    </div>
  );
}
