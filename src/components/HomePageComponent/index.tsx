import AllProducts from './AllProducts';
import RecentlyViewedProducts from './RecentlyViewedProducts';
import PopularCategory from './PopularCategory';
import { GlobalButton, GlobalInput } from '../../styled-components/Globalstyle';

export default function HomePageComponents() {
  return (
    <>
      <GlobalButton>dd</GlobalButton>
      <GlobalInput type='text' placeholder='dddddddasdasd'></GlobalInput>
      <PopularCategory />
      <RecentlyViewedProducts />
      <AllProducts />
    </>
  );
}
