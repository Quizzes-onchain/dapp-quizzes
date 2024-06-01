import React, { ReactNode } from 'react'
import HeaderLeaderBoard from '../components/common/header/leader-board'
import NavNavigate from '../components/common/navbar/nav-navigate'

const LeaderBoardLayout: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <div className="relative bg-[url('/assets/images/layout/auth-layout.png')] h-dvh flex flex-col">
    <HeaderLeaderBoard />
    <div className='px-4 pt-4 flex-1 overflow-auto no-scrollbar'>{children}</div>
    <NavNavigate />
  </div>
)

export default LeaderBoardLayout
