'use client'

import fifthlyMedalIcon from '@/public/assets/icons/common/medal/fifthly-medal.svg'
import firstMedalIcon from '@/public/assets/icons/common/medal/first-medal.svg'
import fourthMedalIcon from '@/public/assets/icons/common/medal/fourth-medal.svg'
import secondMedalIcon from '@/public/assets/icons/common/medal/second-medal.svg'
import thirdMedalIcon from '@/public/assets/icons/common/medal/third-medal.svg'
import { StaticImageData } from 'next/image'
import RewardCard from './reward-card'

export type TReward = {
  rank: number
  icon: StaticImageData
  name: string
}

const tokenList = [
  {
    rank: 1,
    icon: firstMedalIcon,
    name: 'firstMedal',
  },
  {
    rank: 2,
    icon: secondMedalIcon,
    name: 'secondMedal',
  },
  {
    rank: 3,
    icon: thirdMedalIcon,
    name: 'thirdMedal',
  },
  {
    rank: 4,
    icon: fourthMedalIcon,
    name: 'fourthMedal',
  },
  {
    rank: 5,
    icon: fifthlyMedalIcon,
    name: 'fifthlyMedal',
  },
]

const Token = () => {
  return (
    <div className='flex items-center flex-wrap justify-center gap-y-4 flex-row -mx-2'>
      {tokenList.map((item, index) => (
        <RewardCard data={item} key={index} />
      ))}
    </div>
  )
}

export default Token
