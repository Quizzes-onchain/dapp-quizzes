import React, { ReactNode } from 'react'
import HeaderLeaderBoard from '../components/common/header/leader-board'
import NavNavigate from '../components/common/navbar/nav-navigate'
import { usePathname } from 'next/navigation'

const MainLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const pathName = usePathname()

  return (
    <div className="relative bg-[url('/assets/images/layout/auth-layout.png')] h-dvh flex flex-col">
      <HeaderLeaderBoard />
      <div className={`${pathName === '/home' ? '' : 'px-4 py-6'} flex-1 overflow-auto no-scrollbar`}>{children}</div>
      <NavNavigate />
    </div>
  )
}

export default MainLayout
