'use client'

import customerCareIcon from '@/public/assets/icons/common/choose-account-type/customer-care.svg'
import manModalIcon from '@/public/assets/icons/common/choose-account-type/man-modal.svg'
import clockIcon from '@/public/assets/icons/common/clock.svg'
import Image from 'next/image'
import AccountCard from './account-card'

const ChooseAccountType = () => {
  return (
    <div className='flex flex-col gap-8 p-4 overflow-visible animate-fade-up'>
      <Image src={clockIcon} alt='clock' />

      <div className='flex flex-col gap-6 overflow-auto no-scrollbar'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-normal leading-[17px] text-black'>Welcome!</span>

          <h1 className='text-base font-semibold leading-5 text-black'>Choose Your account type</h1>
        </div>

        <div className='flex items-center gap-4 mx-[6px] mb-[10px]'>
          <AccountCard
            className='bg-gradient-to-b from-[#FDB2EF66] via-[#FFC9C966] to-[#F4D19766]'
            Icon={<Image src={customerCareIcon} alt='' />}
            type='Admin'
            href='/home'
          />

          <AccountCard
            className='bg-[radial-gradient(163.63%_159.81%_at_127.05%_143.64%,_#FFF_0%,_#97D7FF_46.87%,_#97DFF5_98.14%)]'
            Icon={<Image src={manModalIcon} alt='' />}
            type='User'
            href='/home'
          />
        </div>
      </div>
    </div>
  )
}

export default ChooseAccountType
