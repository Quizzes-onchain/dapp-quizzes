import shareIcon from '@/public/assets/icons/common/choose-account-type/share.svg'
import { setRole } from '@/src/utils/local-storage'
import Image from 'next/image'
import Link from 'next/link'

interface AccountCardProps {
  Icon: React.ReactNode
  type: string
  href: string
  className?: string
}

const AccountCard = ({ Icon, type, href, className }: AccountCardProps) => {
  return (
    <Link
      href={href}
      onClick={() => setRole(type)}
      className={`flex w-full flex-col gap-4 rounded-xl p-4 ring-[6px] ring-[#C8E6F166] ${className}`}
    >
      <div className='self-end'>{Icon}</div>

      <div className='flex items-center gap-[6px]'>
        <div className='flex h-[34px] flex-1 items-center rounded-lg border border-white bg-white/40 p-2'>
          <span className='text-sm font-semibold leading-[18px] text-[#18191B]'>{type}</span>
        </div>

        <div className='flex size-[34px] items-center justify-center rounded-lg bg-white'>
          <Image src={shareIcon} alt='share' />
        </div>
      </div>
    </Link>
  )
}

export default AccountCard
