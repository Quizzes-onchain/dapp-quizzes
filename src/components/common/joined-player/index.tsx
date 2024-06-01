'use client'

import ImgTest from '@/public/assets/images/join-quizzes/test.png'
import { TJoinedPlayer } from '@/src/types/global.d'
import { getZkAccounts } from '@/src/utils/local-storage'
import Image from 'next/image'

type TJoinedPlayerProps = {
  data: TJoinedPlayer[]
}

const JoinedPlayer = ({ data }: TJoinedPlayerProps) => {
  const account = getZkAccounts()

  return (
    <div className='h-fit max-h-full grid grid-cols-2 grid-flow-row gap-4 overflow-auto no-scrollbar'>
      {data.length ? (
        data.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-[16px] h-[195px] ${account[0].userAddr && account[0].userAddr === item.publicAddress ? 'border-[#00C4FF] border-[2px]' : 'border-[#E3E3E3]'} bg-[#FFFFFF66] border px-4 py-6 flex flex-col items-center gap-2`}
          >
            <div className='absolute bg-[#0085DD1A]/10 w-8 h-8 text-[#00C4FF] font-semibold text-[14px] flex items-center justify-center rounded-full top-2 left-2'>
              {index + 1}
            </div>

            <div className='flex flex-col items-center gap-2'>
              <Image src={ImgTest} alt='image' draggable={false} className='rounded-xl' />
              <div className='text-[#333333] font-semibold text-[16px] mt-0'>{item.name}</div>
            </div>

            <div className='mt-0 rounded-full bg-[#E3E3E3] flex items-center justify-center py-[6px] px-[10px] text-[#000000] text-[12px]'>
              {item.score} Point
            </div>
          </div>
        ))
      ) : (
        <div className='flex items-center justify-center w-full text-base font-medium text-[#18191B] col-span-2'>
          Empty Player
        </div>
      )}
    </div>
  )
}

export default JoinedPlayer
