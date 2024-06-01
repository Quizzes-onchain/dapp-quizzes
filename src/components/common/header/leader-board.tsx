'use client'

import Logo from '@/public/assets/images/header/logo.svg'
import Menu from '@/public/assets/images/header/menu.svg'
import Person from '@/public/assets/images/header/person.svg'

import { END_GAME } from '@/src/constant/socket.constant'
import { useAppSelector } from '@/src/hooks/appHook'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MenuModal from '../../modal/menu-modal'
import ProfileModal from '../../modal/profile-modal'

const HeaderLeaderBoard = () => {
  const [isOpenModalMenu, setIsOpenModalMenu] = useState<boolean>(false)
  const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false)
  const [showMenuButton, setShowMenuButton] = useState<boolean>(true)

  const socket = useAppSelector((state) => state.socket.socket)

  const searchParams = useSearchParams()
  const pin = searchParams.get('pin') || ''
  const pathname = usePathname()
  const router = useRouter()

  const handleClickAvatar = () => {
    setIsOpenModalProfile(true)
  }
  const handleClickMenu = () => {
    setIsOpenModalMenu(true)
  }
  const handleClickQuizzes = () => {}

  const handleEndGame = () => {
    socket?.emit(END_GAME, { pin })
    router.push('/home')
  }

  useEffect(() => {
    if (pathname.includes('/share-quizzes')) {
      setShowMenuButton(false)
      return
    }
    setShowMenuButton(true)
  }, [pathname])

  return (
    <div>
      <MenuModal isOpen={isOpenModalMenu} setIsOpen={setIsOpenModalMenu} />
      <ProfileModal isOpen={isOpenModalProfile} setIsOpen={setIsOpenModalProfile} />
      <div
        className={`sticky inset-x-0 top-0 z-0 flex w-full items-center justify-between p-4 backdrop-blur-3xl ${pathname === '/home' || isOpenModalMenu ? 'bg-[#FFFFFF]' : 'bg-transparent'}`}
      >
        <button onClick={handleClickAvatar} className='cursor-pointer hover:opacity-85'>
          <Image src={Person} alt='Person' draggable={false} />
        </button>
        <button onClick={handleClickQuizzes} className='cursor-pointer hover:opacity-85'>
          <Image src={Logo} alt='Logo' draggable={false} />
        </button>
        {showMenuButton ? (
          <button
            onClick={handleClickMenu}
            className='bg-[#FFFFFF] flex cursor-pointer hover:opacity-85 w-[40px] h-[40px] rounded-full bg-opacity-40 items-center justify-center'
          >
            <Image src={Menu} alt='Menu' draggable={false} />
          </button>
        ) : (
          <button
            onClick={handleEndGame}
            className='flex items-center justify-center py-3 px-4 rounded-lg bg-[#F5222D] h-[42px] hover:opacity-75'
            type='button'
          >
            <span className='text-sm leading-[18px] font-medium text-white'>End</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default HeaderLeaderBoard
