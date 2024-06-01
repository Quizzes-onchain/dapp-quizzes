'use client'

import lockIcon from '@/public/assets/icons/home/lock.svg'
import clockIcon from '@/public/assets/icons/home/oclock.svg'
import imageDefaultIcon from '@/public/assets/icons/common/imageDefault.svg'
import { TPublicQuizData } from '@/src/types/global'
import Image from 'next/image'

type QuizzesItemProps = {
  data: TPublicQuizData
}

const PublicQuizzCard = ({ data }: QuizzesItemProps) => {
  return (
    <div className='bg-white p-3 rounded-xl shadow-md flex w-full'>
      <div className='flex flex-col gap-4 w-full'>
        <div className='w-full h-[100px] relative'>
          <Image src={data.image || imageDefaultIcon} alt='quiz-img' className='rounded-md object-cover' fill />
        </div>{' '}
        <div className='flex flex-col justify-between gap-1'>
          <div className='space-y-2'>
            <p className='text-base leading-5 font-semibold text-[#18191B]'>{data.title}</p>
            <div className='flex items-center gap-2'>
              <Image src={lockIcon} alt='clock' className='size-4' />
              <p className='text-sm font-base text-[#A5A5B5]'>Public</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Image src={clockIcon} alt='clock' className='size-4' />
            <p className='text-sm font-base text-[#A5A5B5]'>10s</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicQuizzCard
