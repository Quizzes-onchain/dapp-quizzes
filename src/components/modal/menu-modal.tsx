import { Dispatch, SetStateAction } from 'react'
import TopContainerModal from './top-container-modal'
import Image from 'next/image'

import facebookIcon from '@/public/assets/icons/auth/facebook.svg'
import googleIcon from '@/public/assets/icons/auth/google.svg'
import twitchIcon from '@/public/assets/icons/auth/twitch.svg'
import { clearRole, clearToken, clearZkAccounts } from '@/src/utils/local-storage'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface MenuModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const buttons = [
  {
    title: 'Home',
    type: 'home',
    path: '/home',
  },
  {
    title: 'Create',
    type: 'create',
    path: '',
  },
  {
    title: 'Join',
    type: 'join',
    path: '',
  },
]

const MenuModal = ({ isOpen, setIsOpen }: MenuModalProps) => {
  const router = useRouter()

  const handleLogout = () => {
    clearToken()
    clearZkAccounts()
    clearRole()

    router.push('/')
  }

  return (
    <TopContainerModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='flex flex-col items-center justify-center w-full gap-4 p-5'>
        <div className='flex flex-col items-center justify-center font-semibold text-2xl gap-3 w-full'>
          {buttons.map((item, index) => (
            <Link href={item.path} key={index} className='hover:opacity-75 py-[10px] outline-none w-full text-center'>
              {item.title}
            </Link>
          ))}
        </div>

        <div className='flex flex-col items-center justify-center gap-4'>
          <p className='text-[#8F9399] text-sm'>Follow Us</p>
          <div className='flex items-center justify-center gap-6'>
            <Link href='#'>
              <Image className='cursor-pointer hover:opacity-75 outline-none' src={facebookIcon} alt='facebook' />
            </Link>
            <Link href='#'>
              <Image className='cursor-pointer hover:opacity-75 outline-none' src={googleIcon} alt='google' />
            </Link>
            <Link href='#'>
              <Image className='cursor-pointer hover:opacity-75 outline-none' src={twitchIcon} alt='twitch' />
            </Link>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-4'>
          <button
            onClick={handleLogout}
            className='border-[#D3D1D1] border-[1px] px-6 py-4 w-[167px] rounded-full hover:opacity-75'
          >
            <p className='font-medium text-base'>Logout</p>
          </button>

          <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#8F9399] to-transparent'></div>

          <p className='text-[#8F9399]'>©All rights reserved</p>
        </div>
      </div>
    </TopContainerModal>
  )
}

export default MenuModal
