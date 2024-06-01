import Image from 'next/image'
import React, { ReactNode } from 'react'

import clockIcon from '@/public/assets/icons/answer-question/14.svg'
import { useAppSelector } from '../hooks/appHook'

const AnswerLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const totalQuestion = useAppSelector((state) => state.answerQuestion.totalQuestion)
  const currentQuestion = useAppSelector((state) => state.answerQuestion.currentQuestion)

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex items-center justify-between py-[10px] px-[16px] bg-white'>
        <p className='text-[16px] font-semibold leading-[20.16px]'>
          Question {currentQuestion}/{totalQuestion}
        </p>
        <div className='flex flex-row py-[6px] rounded-[32px] items-center px-[12px] gap-[6px] bg-gradient-to-r from-[#00C4FF]/10 to-[#0099FF]/10'>
          <Image src={clockIcon} alt='' />
          <p className='text-[14px] leading-[20px] font-medium text-[#0085DD] tracking-[1%]'>50s</p>
        </div>
      </div>
      <div className='flex-1 overflow-auto no-scrollbar'>{children}</div>
    </div>
  )
}

export default AnswerLayout
