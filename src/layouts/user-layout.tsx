import React, { ReactNode } from 'react'
import MainButton from '../components/common/main-button'

const UserLayout: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <div className='w-full h-full flex flex-col'>
    <div className='flex items-center justify-between p-4 bg-white shadow-[0_4px_6px_-4px_#0000001A]'>
      <button className='p-3 text-sm leading-[18px] font-medium text-[#A5A5B5]'>Cancel</button>
      <h1 className='text-base font-bold leading-5 text-black'>Create Quizzes on-chain</h1>
      <button className='p-3 text-sm leading-[18px] font-medium text-[#18191B]'>Save</button>
    </div>
    <div className='flex-1 overflow-auto no-scrollbar'>{children}</div>
    <div className='flex items-center justify-between p-4 bg-white shadow-[-4px_-4px_4px_0_#00000005]'>
      <MainButton onClick={() => {}}>Add Question</MainButton>
    </div>
  </div>
)

export default UserLayout
