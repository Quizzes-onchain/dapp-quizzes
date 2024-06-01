'use client'

import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'

import avatar from '@/public/assets/icons/leader-board/Avata.svg'
import poinChart from '@/public/assets/images/poin-chart/poin-chart.svg'
import queen from '@/public/assets/images/poin-chart/queen.svg'

import { useAppSelector } from '@/src/hooks/appHook'

const PointsChartPage = () => {
  const [tab, setTab] = useState<number>(0)
  const scoreBoard = useAppSelector((state) => state.answerQuestion.scoreBoard)

  return (
    <div className='flex flex-1 w-full flex-col items-center gap-[49px] px-[16px] pb-[20px] animate-fade-up'>
      <Tab.Group
        defaultIndex={tab}
        onChange={(index) => {
          setTab(index)
        }}
      >
        <div className='flex flex-col items-center gap-[16px]'>
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

        <div className='flex relative h-full w-full flex-col items-center gap-[0px]'>
          <div className='flex w-full items-center justify-center mb-[6px] gap-8 relative'>
            {scoreBoard.length >= 3 ? (
              <Rank
                name={scoreBoard[2].name}
                image={avatar}
                point={scoreBoard[2].score}
                className='absolute right-12 top-1/4'
              />
            ) : null}
            {scoreBoard.length >= 1 ? (
              <Rank name={scoreBoard[0].name} image={avatar} point={scoreBoard[0].score} className='' rank={1} />
            ) : null}
            {scoreBoard.length >= 2 ? (
              <Rank
                name={scoreBoard[1].name}
                image={avatar}
                point={scoreBoard[1].score}
                className='absolute left-12 top-1/2'
              />
            ) : null}
          </div>
          <Image className='' src={poinChart} alt='poinChart' draggable='false' />
          <Tab.Panels className='-mt-4 z-0 no-scrollbar overflow-auto flex h-full w-full flex-col rounded-[12px] bg-[#000000]/[.06] p-[16px]'>
            <Tab.Panel className='flex flex-col gap-[10px]'>
              {scoreBoard.length >= 4 &&
                scoreBoard.slice(3).map((item, index) => (
                  <div
                    key={index}
                    className='flex w-full flex-row items-center gap-[16px] rounded-[12px] bg-[#FFFFFF] px-[16px] py-[10px]'
                  >
                    <div className='border-[#E3E3E3] border-[1px] rounded-full w-[24px] h-[24px] flex justify-center items-center'>
                      <p className='text-[#A5A5B5] text-sm'>{index + 4}</p>
                    </div>

                    <div className='flex flex-row items-center gap-[12px]'>
                      <Image
                        className='left-[12px] top-[12px] z-0 cursor-pointer hover:opacity-75'
                        src={avatar}
                        width={40}
                        height={40}
                        alt='avatar'
                      />

                      <div className='flex flex-col gap-[6px]'>
                        <span className='text-[16px] font-semibold leading-[20.16px]'>{item.name}</span>

                        <span className='leading-[# 17.64px] text-[14px] text-[#A5A5B5]'>{item.score} Points</span>
                      </div>
                    </div>
                  </div>
                ))}
            </Tab.Panel>
            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  )
}

export default PointsChartPage

const Rank = ({
  name,
  image,
  point,
  className,
  rank,
}: {
  name: string
  image: string
  point: string
  className?: string
  rank?: number
}) => {
  return (
    <div className={`flex flex-col items-center cursor-pointer hover:opacity-75 ${className} `}>
      {rank === 1 && <Image className='absolute -top-7 z-0' src={queen} alt='queen' />}
      <Image className='rounded-full w-[60px] h-[60px] border' src={image} alt='top_1' />

      <span className='text-[16px] mt-2 mb-3 font-semibold leading-[20.16px]'>{name}</span>
      <button
        className={`${rank === 1 ? 'bg-gradient-to-r from-[#00C4FF] to-[#0085DD] text-[#FFFFFF]' : 'bg-[#0000000F] text-[#000000] '} px-[10px] py-[6px] rounded-full leading-[17.64px] text-[12px] `}
      >
        {point} Point
      </button>
    </div>
  )
}
