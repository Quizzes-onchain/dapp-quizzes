'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import IcHome from '@/public/assets/images/navbar/home.svg'
import CreateQuizzesModal from '../../modal/create-quizzes-modal'
import JoinQuizzesModal from '../../modal/join-quizzes-modal'
import ButtonAction from './button-action'
import IconJoin from './icon-join'
import IconPlus from './icon-plus'

const NavNavigate = () => {
  const router = useRouter()
  const pathName = usePathname()
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false)
  const [isOpenModalJoin, setIsOpenModalJoin] = useState<boolean>(false)

  const handleOpenModalCreate = () => setIsOpenModalCreate(true)
  const handleCloseModalCreate = () => setIsOpenModalCreate(false)
  const handleOpenModalJoin = () => setIsOpenModalJoin(true)
  const handleCloseModalJoin = () => setIsOpenModalJoin(false)

  const handleSelectButtonCreate = () => {
    handleOpenModalCreate()
    handleCloseModalJoin()
  }

  const handleSelectButtonJoin = () => {
    handleOpenModalJoin()
    handleCloseModalCreate()
  }

  return (
    <>
      <JoinQuizzesModal isOpen={isOpenModalJoin} setIsOpen={setIsOpenModalJoin} />
      <CreateQuizzesModal isOpen={isOpenModalCreate} setIsOpen={setIsOpenModalCreate} />

      <div className='flex flex-col w-full items-center justify-evenly bg-white'>
        <div className='flex flex-row gap-16 w-full'>
          <ButtonAction onClick={handleSelectButtonCreate} Icon={IconPlus} active={isOpenModalCreate}>
            Create
          </ButtonAction>
          <ButtonAction onClick={handleSelectButtonJoin} Icon={IconJoin} active={isOpenModalJoin}>
            Join
          </ButtonAction>
        </div>

        <div
          onClick={() => router.push('/home')}
          className='absolute bottom-[19px] left-1/2 z-0 flex -translate-x-1/2 transform cursor-pointer flex-col items-center transition-all hover:opacity-85'
        >
          <Image src={IcHome} alt='IcHome' draggable={false} />
          <div className={`${pathName === '/home' ? 'text-[#0085DD]' : 'text-[#9DB2CE]'} text-[14px]`}>Home</div>
        </div>
      </div>
    </>
  )
}

export default NavNavigate
