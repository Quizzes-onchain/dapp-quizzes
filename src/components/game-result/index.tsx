import exitIcon from '@/public/assets/icons/common/exit.svg'
import settingIcon from '@/public/assets/icons/common/setting.svg'
import Image from 'next/image'
import QuizzesHeaderContainer from '../common/header/quizzes-header-container'
import PlayerResult from './player-result'

const GameResult = () => {
  return (
    <div className='flex flex-col'>
      <QuizzesHeaderContainer>
        <Image src={settingIcon} alt='setting' />

        <Image src={exitIcon} alt='exit' />
      </QuizzesHeaderContainer>

      <div className='p-4 flex flex-col gap-6'>
        <PlayerResult />
      </div>
    </div>
  )
}

export default GameResult
