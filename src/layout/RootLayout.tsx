import { Outlet } from 'react-router-dom'
import LayoutHeader from './LayoutHeader'
import LayoutFooter from './LayoutFooter'



export default function RootLayout() {
  return (
    <>
      <LayoutHeader />
      <Outlet />
      <LayoutFooter />
    </>
  )
}
