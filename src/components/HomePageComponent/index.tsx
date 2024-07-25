import AllProducts from './AllProducts';
import PopularCategory from './PopularCategory';
// import RecentlyViewedProducts from './RecentlyViewedProducts';

export default function HomePageComponents() {
  return (
    <>
      <PopularCategory />
      {/* <RecentlyViewedProducts /> */}
      <AllProducts />
    </>
  );
}
