import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';

const MainContent = styled.main`
  flex-grow: 1;
  min-height: calc(100vh - 240px);
`;

export default function RootLayout() {
  return (
    <>
      <LayoutHeader />
      <MainContent>
        <Outlet />
      </MainContent>
      <LayoutFooter />
    </>
  );
}
