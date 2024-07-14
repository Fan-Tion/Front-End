import AllProducts from './AllProducts';
import RecentlyViewedProducts from './RecentlyViewedProducts';
import PopularCategory from './PopularCategory';

export default function HomePageComponents() {
  return (
    <>
      <PopularCategory />
      <RecentlyViewedProducts />
      <AllProducts />
    </>
  );
}
