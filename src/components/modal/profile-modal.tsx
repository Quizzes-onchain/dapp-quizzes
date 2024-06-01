import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import checkIcon from '@/public/assets/icons/common/check.svg'
import closeIcon from '@/public/assets/icons/common/close.svg'
import copyIcon from '@/public/assets/icons/common/copy.svg'
import Avatar from '@/public/assets/images/modal/avatar.svg'

import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { fetchBalance } from '@/src/store/actions/user.action'
import { getZkAccounts } from '@/src/utils/local-storage'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import LeftContainerModal from './left-contaniner-modal'
interface ProfileModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const pages = [
  {
    title: 'History',
    path: '',
  },
  {
    title: 'Reward',
    path: '',
  },
  {
    title: 'Leaderboard',
    path: '/leader-board',
  },
]

const ProfileModal = ({ isOpen, setIsOpen }: ProfileModalProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const balance = useAppSelector((state) => state.user.balance)
  const account = getZkAccounts()

  useEffect(() => {
    if (account.length > 0) {
      dispatch(fetchBalance(account[0]?.userAddr))
    }
  }, [account, account.length, dispatch])

  const closeModal = () => {
    setIsOpen(false)
  }

  const [copySuccess, setCopySuccess] = useState<boolean>(false)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
    } catch (error) {
      toast.error('Failed to copy')
    }
  }

  useEffect(() => {
    if (copySuccess) {
      const timeout = setTimeout(() => {
        setCopySuccess(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [copySuccess])

  return (
    <LeftContainerModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='flex flex-col gap-4 p-10 sm:p-5'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-3'>
            <button onClick={() => {}} className='cursor-pointer outline-none hover:opacity-85'>
              <Image src={Avatar} alt='Person' draggable={false} className='size-20 rounded-full' />
            </button>
          </div>

          <div>
            <Image
              className='cursor-pointer items-start hover:opacity-75'
              src={closeIcon}
              alt='close'
              onClick={closeModal}
            />
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between'>
            <p className='font-medium text-2xl text-ellipsis overflow-hidden'>
              {account.length > 0 ? account[0].userAddr.substring(0, 6) + '...' + account[0].userAddr.slice(-4) : ''}
            </p>
            <button onClick={() => handleCopy(account[0].userAddr)}>
              <Image src={copySuccess ? checkIcon : copyIcon} alt='' width={24} height={24} />
            </button>
          </div>

          <p className='text-[#A5A5B5] text-base'>{`${balance} SUI`}</p>
        </div>

        <div className='bg-[#8B8986] opacity-40 w-full h-[1px]'></div>

        <div className='flex flex-col gap-3 items-start'>
          {pages.map((page, index) => (
            <button
              key={index}
              className='outline-none focus:outline-none w-full py-[10px] font-semibold text-left hover:opacity-70'
              onClick={() => {
                router.push(page.path || '')
              }}
            >
              {page.title}
            </button>
          ))}
        </div>
      </div>
    </LeftContainerModal>
  )
}

export default ProfileModal
