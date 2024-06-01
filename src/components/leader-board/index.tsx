'use client'
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'

import avatar from '@/public/assets/icons/leader-board/Avata.svg'
import exclude from '@/public/assets/icons/leader-board/exclude-cut.png'
import pin from '@/public/assets/icons/leader-board/pin 1.svg'

import no5_icon from '@/public/assets/icons/common/medal/fifthly-medal.svg'
import no1_icon from '@/public/assets/icons/common/medal/first-medal.svg'
import no4_icon from '@/public/assets/icons/common/medal/fourth-medal.svg'
import no2_icon from '@/public/assets/icons/common/medal/second-medal.svg'
import no3_icon from '@/public/assets/icons/common/medal/third-medal.svg'
import no1_frame from '@/public/assets/icons/leader-board/no1_frame.svg'
import no2_frame from '@/public/assets/icons/leader-board/no2_frame.svg'
import no3_frame from '@/public/assets/icons/leader-board/no3_frame.svg'
import no4_frame from '@/public/assets/icons/leader-board/no4_frame.svg'
import no5_frame from '@/public/assets/icons/leader-board/no5_frame.svg'
import no6_icon from '@/public/assets/icons/leader-board/no6.svg'
import no6_frame from '@/public/assets/icons/leader-board/no6_frame.svg'
import no7_icon from '@/public/assets/icons/leader-board/no7.svg'
import no7_frame from '@/public/assets/icons/leader-board/no7_frame.svg'
import { useSearchParams } from 'next/navigation'
import JoinQuizzesModal from '../modal/join-quizzes-modal'
import { clearPreviousGameUrl, getPreviousGameUrl } from '@/src/utils/local-storage'

const ranking = [
  {
    icon: no1_icon,
    frame: no1_frame,
  },
  {
    icon: no2_icon,
    frame: no2_frame,
  },
  {
    icon: no3_icon,
    frame: no3_frame,
  },
  {
    icon: no4_icon,
    frame: no4_frame,
  },
  {
    icon: no5_icon,
    frame: no5_frame,
  },
  {
    icon: no6_icon,
    frame: no6_frame,
  },
  {
    icon: no7_icon,
    frame: no7_frame,
  },
]

const LeaderBoardPage = () => {
  const [tab, setTab] = useState(0)

  const [isOpenModalJoin, setIsOpenModalJoin] = useState<boolean>(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.size > 0) handleOpenModalJoin()

    const previousGameUrl = getPreviousGameUrl()
    if (previousGameUrl) clearPreviousGameUrl()
  }, [searchParams])

  const handleOpenModalJoin = () => setIsOpenModalJoin(true)

  return (
    <div className='flex h-full w-full flex-col items-center gap-[25px]'>
      <Tab.Group
        defaultIndex={tab}
        onChange={(index) => {
          setTab(index)
        }}
      >
        <div className=' flex flex-col items-center gap-[16px]'>
          <div className='text-[24px] font-semibold leading-[20.24px]'>Leaderboard</div>
          <div className='rounded-[8px] bg-[#000000]/10 p-[8px]'>
            <Tab.List>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? 'w-[100px] rounded-[8px] bg-[#FFFFFF] px-[16px] py-[10px] text-[14px]  font-medium text-[#000000] outline-none'
                        : 'w-[100px] rounded-[8px] px-[16px] py-[10px] text-[14px] font-medium  text-[#FFFFFF]'
                    }
                  >
                    Weekly
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? 'w-[100px] rounded-[8px] bg-[#FFFFFF] px-[16px] py-[10px] text-[14px]  font-medium text-[#000000] outline-none'
                        : 'w-[100px] rounded-[8px] px-[16px] py-[10px] text-[14px] font-medium  text-[#FFFFFF]'
                    }
                  >
                    All Time
                  </button>
                )}
              </Tab>
            </Tab.List>
          </div>
        </div>

        <Image className='absolute left-[50%] top-[200px]' src={pin} alt='pin' />

        <div className='flex h-screen w-full overflow-hidden pb-[-60px] flex-col items-center gap-[0px]'>
          <Image className='' src={exclude} alt='exclude' />
          <Tab.Panels className='no-scrollbar overflow-auto flex h-full w-full flex-col rounded-t-[12px] bg-[#000000]/[.06] p-[16px]'>
            <Tab.Panel className='flex flex-col gap-[10px]'>
              {ranking.map((item, index) => (
                <div
                  key={index}
                  className='flex w-full flex-row items-center gap-[16px] rounded-[12px] bg-[#FFFFFF] px-[16px] py-[10px]'
                >
                  <Image className='cursor-pointer hover:opacity-75' src={item.icon} alt='top_1' />

                  <div className='flex flex-row items-center gap-[12px] relative'>
                    <div className='relative flex items-center'>
                      <Image
                        className='z-0 cursor-pointer hover:opacity-75'
                        src={avatar}
                        width={40}
                        height={40}
                        alt='avatar'
                      />
                    </div>

                    <Image
                      className='left-[-12px] absolute z-0 cursor-pointer hover:opacity-75'
                      src={item.frame}
                      width={60}
                      height={60}
                      alt='avatarFrame'
                    />

                    <div className='flex flex-col gap-[6px]'>
                      <span className='text-[16px] font-semibold leading-[20.16px]'>Hoang {index + 1}</span>

                      <span className='leading-[# 17.64px] text-[14px] text-[#A5A5B5]'>500 Points</span>
                    </div>
                  </div>
                </div>
              ))}
            </Tab.Panel>
            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
      <JoinQuizzesModal isOpen={isOpenModalJoin} setIsOpen={setIsOpenModalJoin} pin={`${searchParams}`} />
    </div>
  )
}

export default LeaderBoardPage
