import Image from 'next/image'

import avatar from '@/public/assets/icons/leader-board/Avata.svg'
import no2_frame from '@/public/assets/icons/leader-board/no2_frame.svg'
import { TScoreBoardItemSocket } from '@/src/types/global'

interface UserCardProps {
  user: TScoreBoardItemSocket
  currentUser?: boolean
}

const UserCard: React.FC<UserCardProps> = ({ user, currentUser }) => {
  return (
    <div
      className={`${currentUser ? 'bg-gradient-to-r from-[#00C4FF] to-[#0085DD] ' : ''} p-[12px] rounded-[12px] flex justify-between shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-full`}
    >
      <div className='flex flex-row items-center gap-[6px]'>
        <div className='relative flex items-center'>
          <Image
            className='absolute left-[10px] top-[10px] translate-x-[0.5px] translate-y-[0.5px] z-0 cursor-pointer hover:opacity-75'
            src={avatar}
            width={32}
            height={32}
            alt='avatar'
          />

          <Image
            className='relative z-10 cursor-pointer hover:opacity-75'
            src={no2_frame}
            width={52}
            height={52}
            alt='avatarFrame'
          />
        </div>

        <div className='flex flex-col gap-[6px]'>
          <span
            className={`text-[16px] font-semibold leading-[20.16px] ${currentUser ? 'text-white' : 'text-[#18191B]'}`}
          >
            {user.name}
          </span>

          <span className={`leading-[17.64px] text-[14px] ${currentUser ? 'text-white' : 'text-[#A5A5B5]'}`}>
            {user.score} Points
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserCard
