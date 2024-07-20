import { Outlet } from 'react-router-dom'
import LayoutFooter from './LayoutFooter'
import LayoutHeader from './LayoutHeader'



export default function RootLayout() {
  return (
    <>
      <LayoutHeader />
      <Outlet />
      <LayoutFooter />
    </>
  )
}
